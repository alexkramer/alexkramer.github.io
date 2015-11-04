---
layout: post
title:  "Groovy Annotation to add Business Key and Equals/Hash Code to Grails Domain Class"
date:   2015-01-04 14:34:25
categories: grails
tags: groovy grails
comments: true
---

# The problem
We were struggling with the seemingly random occurrence of non-reproducible hibernate flush errors in our large Grails application. After a lot of reading we found that we needed to revisit our understanding of hibernate. One thing that I noticed immediately was that we had a number of classes with custom equals/hash code implementations that violated the hibernate [guidelines for equals and hash code](https://developer.jboss.org/wiki/EqualsAndHashCode). When going through the classes, I found that a number of them did not have a sufficient natural key (a composite key that is close to if not always unique, made up of the classes properties). The next step was to give them a unique identifier that did not belong to hibernate -- a secondary key or a business key. For these classes I was going to have to add a business key (in my case a String represenation of a Java random UUID) as well as equals and hash code implemenations that leverage just the business key. I could have taken the easy way out and just copied the business key property declaration to each class and then used the groovy [EqualsAndHashCode](http://groovy.codehaus.org/gapi/groovy/transform/EqualsAndHashCode.html) annotation to give me the equals and hash code implemenations using just my newly declared business key, but I hate copying code. So I embarked on a mission to create my new annotation to both add an initialized business key property to a class and create the required equals and hash code implementations (utilizing the aforementioned groovy supplied annotation, once again no need to copy code!).

# The Solution
I needed to know how to create one of these annotations (Groovy AST Transformations) so I searched around and found a couple of useful posts. This [one in particular](http://www.zorched.net/2011/11/09/using-groovy-ast-to-add-common-properties-to-grails-domain-classes/) from Geoff Lane was useful as it provides an example of adding a property to a class. I also read through the applicable [groovy docs](http://groovy.codehaus.org/Local+AST+Transformations) on the subject. So now that we got the attributions out of the way, here is what I came up with:

### The AST Transformation
This is where all the magic happens. I would recommend adding the file to your src/groovy in either a special transform or ast package (more on why this is necessary in a bit).

{% gist alexkramer/6746998b06f1bd809476 UUIDEqualsHashCodeTransformation.groovy %}

### The Annotation
Now that we have our transformation we need to create the annotation (which is just the wrapper that will tell Grails to apply our transformation)

{% gist alexkramer/6746998b06f1bd809476 UUIDEqualsHashCode.groovy %}

### Example application of the annotation

Just a simple class which demos how you would utilize the annotation. If you are having issues, your can check out the AstTest annotation which allows for you to inspect the AST tree at compile time. (I would have included an example but it was throwing some weird errors in my project and I haven't had time to figure them out just yet)

{% gist alexkramer/6746998b06f1bd809476 NeedsBusinessKey.groovy %}

### Getting it to work with Grails
After much frustration and tweaking I finally discovered that due to the order of compilation, my transformation was not ready when the Domain classes were ready. Instead of throwing up Grails just went on its way and failed silently. Silly me was thinking that it didn't work. The internet informed me I had two options: one was to build a plugin and the other was to hook into the compile event and tell it to compile my code first. A plugin screamed of overkill considering it was just a couple of tiny files so I went with the latter option. I tweaked a [solution](https://github.com/kaleidos/grails-postgresql-extensions/blob/grails-2.x/scripts/_Events.groovy) I found from GitHub user kaleidos which you will find below. One note is that the variable names injected weren't what I expected (I am still running Grails 2.2.1 unfortunately). If you have issues just throw a block point in there and you should be able to figure it out by running compile in debug mode. This is why I suggested you put your annotation and transformation classes in their own package, so that you can easily reference them from the events closure.

{% gist alexkramer/6746998b06f1bd809476 Events.groovy %}
