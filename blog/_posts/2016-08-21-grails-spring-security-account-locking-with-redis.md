---
title: "Grails Spring Security Account Locking with Redis"
description: "Grails Spring Security Account Locking with Redis"
date: 2016-08-21
categories: ["Grails"]
---

For a new project at [Good Start Genetics](http://www.goodstartgenetics.com) we decided to use Grails 3 to build a
RESTful JSON API. As with all of the Grails applications and services we have
built we installed the Spring Security Core plugin. Given that this was an API
only, we also integrated the Spring Security REST extension. This latter plugin
provides a set of tools to secure our endpoints via tokens. When implementing
the REST security plugin we opted to use Redis for our token store. Redis was
selected for two reasons:

1. Auth requests would not need to make a request to the DB
2. Tokens can easily be timed out after a configured period of inactivity

Getting that all setup was simple. Now came the inevitable requirement to have
user's accounts locked out after a number of unsuccessful login attempts.
Despite being a requirement of every application I have working on, its not a
use case covered explicitly by the Grails Spring Security plugins. In the past I
implemented this requirement by adding fields to my User object to track the
number of failed attempts and then updating the locked boolean on the User
object when the max number of attempts was breached. This worked fine and I
considered this approach again. However, given I already had Redis support
integrated into my application I figured this was a perfect use case.

### The Implementation

First I needed a service that would be called after a failed attempt and
increment the number of attempts in Redis for the given user.

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Falexkramer%2Fgrails-security-rest-redis-sample%2Fblob%2F1332a4189af4ef43f680b33f9e90cccda3c4441e%2Fgrails-app%2Fservices%2Fgrails%2Fsecurity%2Frest%2Fredis%2FLoginAttemptsService.groovy&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

Second I needed to listen to the failed login events and make calls out to the
above service when the failed login event corresponded with a known user.

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Falexkramer%2Fgrails-security-rest-redis-sample%2Fblob%2F1332a4189af4ef43f680b33f9e90cccda3c4441e%2Fsrc%2Fmain%2Fgroovy%2Fgrails%2Fsecurity%2Frest%2Fredis%2FFailedLoginListener.groovy&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

And with just those two files, I enabled user locking! For a working sample
application please check out my sample repo:

[Grails Security Rest Redis Sample Application](https://github.com/alexkramer/grails-security-rest-redis-sample)
