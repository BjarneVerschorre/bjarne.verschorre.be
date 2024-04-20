---
title: 'Domain Discovery With Nameservers'
description: "Using Cloudflare nameservers to find other domains managed by the same account.."
date: 2024-04-21T01:17:33+02:00
tags: 
    - "osint"
    - "recon"
    - "dns"
draft: false
---

## How and why does this work?
When you create an account on Cloudflare, you get assigned two nameservers. Any domain you add to your Cloudflare account will have those nameservers.

This means that if you find one domain that is behind Cloudflare, you can use those nameservers to find other domains that are managed by the same account.

## How to do this?
### 1. Finding the nameservers
First, you need to find the nameservers of the domain you are investigating. You can do this by querying the domain with `dig` or `nslookup`. Once you have the nameservers, you can query them to find other domains. Here is an example of how you can do this with `dig`:

```bash
$ dig +short NS <domain>
XXX.ns.cloudflare.com.
YYY.ns.cloudflare.com.
```

Take a note of those nameservers.

### 2. Using DNSlytics to find other domains
Go to [DNSlytics](https://search.dnslytics.com/), set the search from `<all>` to `domains` and type in the following query:
`ns:XXX.ns.cloudflare.com and ns:YYY.ns.cloudflare.com` and hit search.

This will return all domains that are using the same nameservers as the domain you are investigating.

### 3. Investigating the domains
Now that you have a list of domains, you can see which one could belong to your target and investigate them further.
