---
date: "2024-03-24T23:55:24+01:00"
description: How I configure and secure my SSH server..
draft: false
tags:
- guide
- ssh
- security
- server
title: Configuring SSH
---

## SSH key files
These are used as an authentication method to replace the password when logging in with.

### Generating the files
You'll need a `public` and a `private` key file, the `private` key file is for and **for you only**. It shouldn't be shared with anyone and shouldn't be posted anywhere. The `public` one can be shared freely.

You can create the files by doing `$ ssh-keygen -t ed25519 -C "your_email@example.com"`

The `-C` stands for *comment*, it doesn't have to be an email, it can be anything, it's like an optional identifier.
Give it a name (, set a password) and you're done.

### Adding the key to the server
Copy the contents of the `XXX.pub` to the server in `/home/<USER>/.ssh/authorized_keys` file, create the `.ssh/` directory in the users home directory if it doesn't exist.

#### GitHub SSH key
If you have a key on your GitHub profile you can import it with [ssh-import-id](https://github.com/dustinkirkland/ssh-import-id)
- `$ ssh-import-id-gh [-o FILE] USERID [USERID ...]`

---
## Hardening
Follow [these steps](https://www.sshaudit.com/hardening_guides.html) (the Server Guides) to harden your SSH server. These steps are for the `sshd_config` file.

**To apply the changes to SSH and the SSH daemon by restarting them.**
- `$ sudo systemctl restart ssh` and/or `$ sudo systemctl restart sshd`

### Changing the port
This will prevent automated scanners/bots and other unsophisticated threats from attempted to login. This allows for security by obscurity, someone scanning your server will find it.

in the `/etc/ssh/sshd_config` file change `# Port 2` to `Port <random_digits>` for example, `Port 496`.

I recommend you look through [this Wikipedia page](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) to find a port number that isn't used by another application.

**:warning: Allow the new port through your firewall**

### Disabling root login
Allowing root login through SSH is bad practice, you can always login to your user and escalate to root by doing `su root` or `sudo su`.

- `#PermitRootLogin prohibit-password` -> `PermitRootLogin no`

## Disabling password authentication
Since we're using key files there's no need for passwords, uncomment and change the lines to `no`.

- `#PasswordAuthentication yes` -> `PasswordAuthentication no`
- `#PermitEmptyPasswords no` -> `PermitEmptyPasswords no`
- `UsePAM yes` -> `UsePAM no`

### Banner and Motd
A banner will be displayed at the start of the SSH connection and the Motd after a successful login.
#### Banner
Create a file like this:
```shell
$ cat /etc/ssh/banner
**********************************************************
*                                                        *
*           Unauthorized access is prohibited.           *
*         Any attempts are logged and monitored.         *
*                                                        *
**********************************************************
```
Then change `#Banner none` to `Banner /etc/ssh/banner` in `/etc/ssh/sshd_config`.

#### Motd
1. Create or edit the `/etc/motd` file and add your preferred text.
1. Set `PrintMotd` to `yes` in `/etc/ssh/sshd_config`.