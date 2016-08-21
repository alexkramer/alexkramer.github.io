---
layout: post
title:  "Gr8ConfUS 2014"
date:   2014-07-29 14:34:25
categories: grails
tags: groovy grails
image: /assets/article_images/2014-07-29-gr8confus-notes/schulze-hall-exterior.jpg
---

[All slides from conference](https://github.com/sjurgemeyer/GR8ConfUS2014/)

#Asset Pipeline
With the release of 2.4, Asset Pipeline will be the official standard for all grails applications. This plugin transpiles, concatenates, minifies, and gzips all assets by type. In addition asset pipeline improves the cache headers to increase cache hits. The asset pipeline allows for use of any language that transpiles to a browser supported language. In development mode the files are served by name without caching to ease with rapid development. See slides from presentation.

##Improvements over Resources plugin:
- Allows use of CDN
- No waiting to recompile in development
- Precompilation of assets permits faster WAR startup
- Dependencies are within assets

#[Ratpack](https://github.com/sjurgemeyer/GR8ConfUS2014/tree/master/Real%20Time%20Ratpack)
- First class support for Groovy and Java 8
- Employs newer Groovy features like static compilation and type safety
- Based on Netty
- Hi speed, non blocking web framework
- Ratpack is your gateway drug to non blocking
- Everything is done with handlers (using the groovy DSL they are closures)

{% highlight groovy %}
blocking {
	photoService.get(pathTokens.id)
} then { photo ->
	response.send(“image/png”, photo)
}
{% endhighlight %}

#Hibernate Metrics Plugin
- focus on hibernate behavior and domain objects
- doesn’t wrap DB driver thus can turn on/off
- provides time metrics
- counts of sql executed
- 2L and query cache hit/miss
- hibernate stats doesn’t report on criteria queries (until v4.2+)

{% highlight groovy %}
HibernateMetrics.withSqlLogging {
	//some code here, sql will be printed to console
}
{% endhighlight %}

#[Spring Security 2](https://github.com/sjurgemeyer/GR8ConfUS2014/blob/master/burtbeckwith/WhatsNewInSpringSecurity.pdf	)
- switch-user (similar to sudo)
- remember-me
- http/s channel security
- session fixation protection
- more aggressively secure by default
- pessimistic lockdown by default — reject if no rule (would need to define static rules for js/css as a result)
- default hash is bcrypt with salting baked in
- configurable computation timing (every failed attempt takes longer)
- grails.plugins.springsecurity -> grails.plugin.springsecurity
- No HQL, all queries use “where” and criteria
- more configurable bean properties (goal 100%)
- more private -> protected
- Do not use withTransaction, use @Transactional
- should not use getCurrentUser -> loadCurrentUser
- New @Authorities annotation, makes annotations more DRY
- @Secured only works with controller methods
- can put arbitrary rules inside a closure
- Principal now is a UserDetails like when you’re authenticated, but with Role_Anonymous
- With Grails 2.3 -> support for redirect mappings
- Role Groups -> group roles together to create meta rules

##Helpful Annotations
1. Immutable – will not generate any setters
2. Singleton – won't allow anyone else to create an instance
3. Transactional – replaces the withTransaction closure
4. CompileStatic – forces the groovy code to be Java compliant, useful for components that require performance
5. Delegate – easy to override a single method of another bean without manually implementing all of the methods
{% highlight groovy %}
class MyMapHelper {
	@Delegate
	private Map myOwnMap = new HashMap()

	def put(key,val) {
		if (key instance of String) key = key.toUpperCase()
		myOwnMap[key] = value
	}
}
{% endhighlight %}

#[Hybrid View Rendering](https://github.com/sjurgemeyer/GR8ConfUS2014/tree/master/Hybrid%20View%20Rendering%20with%20Grails)
Idea being that you merge template and data on the server and then provide it to the browser

1. Speeds up load times (no ajax json delay after page load)
2. Helps with SEO

In order to implement you generally want to use a template library since they can be rendered on either the client or the server

- [Mustache](http://mustache.github.io/)
- [Handlbars](http://handlebarsjs.com/)
- [Hogan](http://twitter.github.io/hogan.js/)

To help with server side rendering, Nashorn will roll out with Java 8 and is a high performance JS engine for the JVM (replaces Rhino)
Angular is not amenable to hybrid rendering model but you could load the JSON into the HTTP cache
If you require a headless browser proxy, you can use Phantom JS

#Some Random Info
- [GVMTool](http://gvmtool.net) is a groovy ecosystem environment manager
- Gradle – the build tool to rule them all. See [presentation](https://github.com/sjurgemeyer/GR8ConfUS2014/blob/master/John-Engelman/talks.md) on building full application stack using Gradle
- Java Mission Control and Flight Recorder – profiler safe for both development and production use
- findOrCreateBy* and findOrSaveBy* – dynamic methods that I heard about and since implemented into our application
- [GORM Performance](http://www.infoq.com/presentations/GORM-Performance) – talk by Burt at SpringSource conference
- [Direction of Groovy in the future](https://github.com/sjurgemeyer/GR8ConfUS2014/tree/master/Guillaume%20Laforge)
- Gpars – library to make async calls as well as multithreaded groovy applications. See presentation with code examples.
