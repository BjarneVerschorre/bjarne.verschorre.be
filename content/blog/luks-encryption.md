---
date: "2024-03-24T23:28:30+01:00"
description: "I encrypt my drives with LUKS and here's how I do it and why you should too.."
draft: false
tags:
- "encryption"
- "security"
title: "LUKS Encryption"
---

Doing it though a GUI is too easy, so I'm not going to cover that.

## Why encrypt your drives?
- **Privacy**: If someone steals your computer, they can't access your data.
- **Security**: If someone steals your computer, they can't access your data.

## How to encrypt your drives
You're going to need a disk with a parition on it you want to encrypt.

- `$ sudo cryptsetup luksFormat /dev/sdX1`
- `$ sudo cryptsetup open /dev/sdX1 <name>`
  - Replace `<name>` with a name for the partition

**Only run this command to format the partition if you're doing this for the first time.**

`$ sudo mkfs.ext4 /dev/mapper/<name>`

- Create a directory to mount the volume:
  - `$ sudo mkdir /mnt/<name>/`
- Finally mount the volume to the directory:
  - `$ sudo mount /dev/mapper/<name> /mnt/<name>/`

## Unmounting the drive
- `$ sudo umount /mnt/<name>/`
- `$ sudo cryptsetup close <name>`