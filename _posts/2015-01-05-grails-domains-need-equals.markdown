---
layout: post
title:  "Find Grails Domain Classes Needing Equals and Hash Code Implemenations"
date:   2015-01-05 20:00:00
categories: grails
tags: groovy grails
comments: true
---

In a a previous post I outlined a solution for creating an annotation to add an initialized business key as well as equal and hash code implementations. After using is it on a number of domain classes in my project, I then needed to identify if there were existing domain classes which did not define equals and hash code but needed to (because they were part of a persistent set for example). Due to the large number of classes in my project I didn't want to have to manually check for these instances so I devised a script which you can run either in the grails console or by itself using the run-script command. I played around with the available domain class metadata until I arrived at a solution which is provided below.

{% gist alexkramer/a17f21fe377448b18c6e %}