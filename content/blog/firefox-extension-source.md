---
title: 'Firefox Extension Source'
description: "Quick instructions on how to get the source code of a Firefox extension.."
date: 2024-04-09T00:47:23+02:00
tags: 
- guide
- firefox
draft: false
---

## Why it is useful
When installing an extension that is more unknown, you can check the source code to see if it is safe to use.


## How to do it
1. Go to the extension page on the Firefox Add-ons website.
2. Right-click on the "Add to Firefox" button and select "Copy Link".
3. `$ curl -L <link> > /tmp/extension.xpi`
4. `$ unzip /tmp/extension.xpi -d /tmp/extension/`

Now you can check the source code in the `/tmp/extension/` directory.
 