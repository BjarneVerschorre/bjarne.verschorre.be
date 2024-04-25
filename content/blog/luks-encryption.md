---
date: "2024-03-24T23:28:30+01:00"
lastmod: "2024-04-26T00:05:33+01:00"
description: "Step for step guide on how to encrypt and mount partitions with LUKS.."
draft: false
tags:
- guide
- encryption
- security
title: "LUKS Encryption"
---

Doing it through an GUI is simple, these steps are for the terminal.

## Why encrypt your drives?
- **Privacy**: If someone steals your computer, they can't access your data.
- **Security**: If someone steals your computer, they can't access your data.

## Encrypting a partition
You can get the device name of the partition you want to encrypt by running `lsblk` or `fdisk -l`.

1. Format the partition with LUKS:
   - `$ sudo cryptsetup luksFormat /dev/sdX1`
     - Replace `/dev/sdX1` with the device name of the partition you want to encrypt.

1. Open the encrypted partition:
   - `$ sudo cryptsetup open /dev/sdX1 <name>`
     - Replace `<name>` with a name for the partition *(eg enc_drive)*.

1. Create a filesystem on the encrypted partition:
   - `$ sudo mkfs.ext4 /dev/mapper/<name>`


## Mounting an encrypted partition
You are probaly going to want to mount the encrypted partition after you've encrypted it.

1. Open the encrypted partition (if it's not already open):
   - `$ sudo cryptsetup open /dev/sdX1 <name>`
     - Replace `<name>` with the name of the encrypted partition.

1. Create a mounting point and mount the encrypted partition:
   - `$ sudo mkdir /mnt/<name>/`
   - `$ sudo mount /dev/mapper/<name> /mnt/<name>/`


## Unmounting the drive
It's different from unmounting a regular partition. You need to unmount the partition and close the encrypted partition.

1. Unmount the partition:
   - `$ sudo umount /mnt/<name>/`

1. Close the encrypted partition:
    - `$ sudo cryptsetup close <name>`