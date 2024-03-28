---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
description: "Post about {{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
tags: 
    - "tag1"
draft: true
---
