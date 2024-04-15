---
title: 'Setup KVM with Virtmanager'
description: "Guide to setup KVM on an Ubuntu(-based) system with Virtmanager.."
date: 2024-04-14T17:01:29+02:00
tags: 
- guide
- linux
- virtualization
draft: false
---

## Prenote
This guide is written for Ubuntu-based (Linux Mint, Ubuntu, ...) systems. The commands may differ on other distributions. This will make it ready to use for systems like [Whonix](https://www.whonix.org/).

## Install KVM and Virtmanager
- `$ sudo apt install qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils libguestfs-tools genisoimage virtinst libosinfo-bin virt-manager dnsmasq iptables`
- `$ sudo adduser $USER libvirt`
- `$ sudo adduser $USER libvirt-qemu`
- `$ sudo adduser $USER kvm`
- `$ sudo reboot`

## Network setup
- `$ sudo virsh -c qemu:///system net-autostart default`
- `$ sudo virsh -c qemu:///system net-start default`
