---
title: "Grails Hibernate Filters support for Hibernate 5"
description: "Grails Hibernate Filters support for Hibernate 5"
date: 2016-12-18
categories: ["Grails"]
---

While upgrading one of our Grails 2 applications at
[Good Start Genetics](http://www.goodstartgenetics.com) to Grails 3.2.3 we found
that the latest version of the Grails Hibernate Filters plugin was no longer
functional. This ended up being due to the fact that Grails 3.2.x ships with
Hibernate 5 which removed/moved many of the integration patterns available in
Hibernate 4.

### TLDR; The code and plugin

Just want to take a look at how the plugin integrates with Hibernate 5 and GORM 6
or interested in using this version of the plugin in your application? Well no
need to read any further. Head over to GitHub to check out the
[source](https://github.com/alexkramer/grails-hibernate-filter),
[usage](https://github.com/alexkramer/grails-hibernate-filter/wiki), and [installation](https://github.com/alexkramer/grails-hibernate-filter/wiki#installation)
instructions.

### The requirements

Create and register metadata for filter definitions as well as add the filters
to the entities and collections as per user defined settings on the Grails
domain objects. Since hibernate will not enable a filter by default, the plugin
also needs to provide the ability to apply user defined default filters to all
sessions.

### How it worked: Hibernate 4

The hibernate configuration object was widely accessible and had
methods to inspect and inject metadata. The plugin extended the Grails extension
of the hibernate configuration and injected the filter definitions and
entity/collection level filters during the second pass compile. It then applied
the default filters to the session using a Grails interceptor.

### How it works: Hibernate 5

You can add your metadata by creating a class that implements the
[`MetadataContributor`](https://docs.jboss.org/hibernate/orm/5.1/javadocs/org/hibernate/boot/spi/MetadataContributor.html)
interface. The one method that you implement (`contribute`) allows you access to
the `InFlightMetadataCollector`. You can add your metadata directly to the collector
in your implementation of the `contribute` method or you can register a `SecondPass`
object which the collector will invoke later after all of the first pass metadata
has been collected. Since our filters need to be applied after all of the entities
and collections are registered, our implementation of `contribute` simply registers
a single `SecondPass` object. Finally we needed to make hibernate aware of our
`MetadataContributor` so we extended the Grails `HibernateConnectionSourceFactory`
and wired up our contributor in the factory constructor. We explored alternatives
for applying the default filters but ended up leaving the interceptor. Reason being,
all methods we found to apply them would mean that we would potentially not play
nice with other plugins that wanted to extend the Grails hibernate functionality.
