---
date: "2024-03-17T17:30:24+01:00"
description: Setting up and configuring an SFTP server for a single user and/or a group..
draft: false
tags:
- ssh
- sftp
- server
title: Setting up an SFTP server
---

You can use `$ tail -F /var/log/auth.log` to debug any problems.

## Creating a new partition (optional)
Depending on whether or not to do is is up to you.
I'd recommend Making a new partition if:
- Storing a lot data you don't wanna lose when the server OS breaks
- Extra security, you can create an encrypted partition

## Creating the user
`$ sudo adduser --shell /usr/sbin/nologin [USER]` 

You can create a random password for the accounts since they aren't used anyway.
*Add their SSH key to their home directory.*

## Creating a group (optional)
If you don't want to create a group you can skip this step.
- `$ sudo groupadd [GROUP]`
- `$ sudo usermod -aG [GROUP] [USER]`

## Creating the directories
We need to create a directory to store the password database in. We also need to create a directory to chroot the user in, so it can't access anything else on the server.

- `$ sudo mkdir -p /var/sftp/files/`
- `$ sudo chown root:root /var/sftp/`
- `$ sudo chown [USER/root]:[USER/GROUP] /var/sftp/files/`
- `$ sudo chmod -R ug+rwx /var/sftp/files/`
- `$ sudo chmod -R o-rwx /var/sftp/files/`

__**`root` has to own every parent directory for the folder so it has to own `var/` and `sftp/`**__

If you have created a group, set the group bit to the file `/var/sftp/files/` folder to allow anyone in the group to upload and access any file.
`$ sudo chmod g+s /var/sftp/files/`

The users have to put the files inside of the `files/` folder they can't create or modify anything in the `sftp/` directory, that's where the `files/` directory comes in.

If you have a main SSH user that also needs access to that allow "other" to "execute" the parent folders and specify the SFTP directory in Filezilla.

## Setting up SFTP
We need to configure the SSH server to only allow SFTP for the user by adding this to the bottom of the `/etc/ssh/sshd_config` file.

```
Match <User [USER] / Group [GROUP]>
    ForceCommand internal-sftp [-u <umask>]
    PasswordAuthentication no
    ChrootDirectory /var/sftp
    PermitTunnel no
    AllowAgentForwarding no
    AllowTcpForwarding no
    X11Forwarding no
```

If you want the files to have default permissions, add a umask to the `ForceCommand`. You can get a list of the umasks [here](https://wintelguy.com/umask-calc.pl).

Now we just need to restart the SSH server to apply the changes.
`$ sudo systemctl restart sshd`

## Removing a user
If you wanna get rid of a user you can just delete the user account or remove them from the SFTP group.

### Deleting the user account
`$ sudo deluser [USER]`
If you wanna remove the home directory use the `--remove-home` switch.

### Deleting user from group
`$ sudo gpasswd -d [USER] [GROUP]`

## Deleting the entire group
`$ sudo delgroup [GROUP]`

