---
title: 'Better Hugo RSS'
description: "Improving the RSS feed of my Hugo website.."
date: 2024-03-31T16:11:51+02:00
tags: 
    - guide
    - hugo
    - rss
draft: false
---

## Introduction
I use [Hugo](https://gohugo.io/) to build this website, and I use the built-in RSS feed to generate the feed automatically. It create everything I need but it's not perfect, I want the feed to have the full content of the post instead of just the summary. I also want to have an image displayed with my feeds description.

## Creating the feed template
I created a new file in the `layouts/_default/` folder called `section.rss.xml` since this feed is only for my blog.

## Displaying the full content
In that file I changed the following code:
```xml
<description>{{ .Summary | html }}</description>
```

to

```xml
<description>{{ .Content | html }}</description>
```
This will make the feed display the full content of the post instead of just the summary.

## Adding an image
Right under the description tag I added the following code:
```xml
<image>
    <url>http://bjarne.verschorre.be/favicon.ico</url>
    <title>bjarne.verschorre.be</title>
    <link>https://bjarne.verschorre.be</link>
</image>
```
This will add an image to the feed.

## Conclusion
Small improvement, but I like it. Wish Hugo had a setting for this.
