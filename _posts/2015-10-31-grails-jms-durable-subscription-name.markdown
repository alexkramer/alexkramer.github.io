---
layout: post
title:  "Grails JMS Durable Topic Subscription Name"
date:   2015-10-31 18:00:00
categories: groovy
tags: groovy grails spring jms
comments: true
---

My Grails 2.2.1 application has for a while needed to connect to JMS queues. Configuration for that is fairly straightforward and its covered well in the documentation of relevant plugins (I use the Grails JMS Plugin). Recently it became necessary to add a few durable subscriptions to a topic (three to be exact, each with a different selector). Now in the interest of not polluting my configuration files, I wanted these three listeners to share a connection description and JMS container.

First hurdle was to have the three listeners connect my ActiveMQ instances. After not having much success I found that what was missing was a client id -- which you only need to set for durable subscriptions. The client id needs to be setup on the connection factory in resources.groovy (not in the adapter or container settings). Below are examples of the the resources.groovy settings and Config.groovy settings respectively.

{% highlight groovy %}
import grails.util.Environment
import org.apache.activemq.ActiveMQConnectionFactory
import org.springframework.jms.connection.SingleConnectionFactory
// Place your Spring DSL code here
beans = {
    durableJmsConnectionFactory(SingleConnectionFactory) {
        clientId = "${Environment.current.name}-topic-client-id"
        targetConnectionFactory = { ActiveMQConnectionFactory cf ->
            brokerURL = 'failover:(tcp://jms-master:61616,tcp://jms-slave:61616)?randomize=false'
        }
    }

}
{% endhighlight %}

{% highlight groovy %}
jms {
    converters {
        durable {}
    }
    templates {
        durable {
            connectionFactoryBean = "durableJmsConnectionFactory"
            messageConverterBean = "standardJmsMessageConverter"
        }
    }
    containers {
        durable {
            concurrentConsumers = 1
            subscriptionDurable = true
            autoStartup = false
            connectionFactoryBean = 'durableJmsConnectionFactory'
            messageSelector = null
            cacheLevel = DefaultMessageListenerContainer.CACHE_SESSION
        }
    }
    adapters {
        durable {
            persistenceInterceptorBean = 'persistenceInterceptor'
        }
    }
}
{% endhighlight %}

With these settings I was able to get my three listeners connected but the durable subscription was not functional. The default behavior when you use a service listener is that it uses the name of the service as the subscription name. That would be fine except that the the service listener passed to Spring JMS is a proxy of the Service bean. This results in the subscription name having the proxy part included -- "com.enterprise.service.RegistrationListenerService$$EnhancerByCGLIB$$sdf43ghu". Since the last part is randomly generated at every server startup the durable subscription that was setup was worthless. One way to override it would be to define a separate container/adapter for every listener and then hard code the subscription name in the configuration. That is not a scalable solution and is a lot of clutter just to override the default subscription name. The cleaner solution I found was to have my service listeners implement SubscriptionNameProvider.

{% highlight groovy%}
class RegistrationListenerService implements SubscriptionNameProvider {

	static exposes = ['jms']
    static isTopic = true
    static destination = "${Environment.getCurrent().getName()}.incomingMessages"
    static selector = "messageType = 'REGISTRATION'"
    static adapter = "durable"
    static container = "durable"

    def onMessage(msg) {
    	//handle message here
    }

    String getSubscriptionName() {
        "REGISTRATION-LISTENER"
    }

}
{% endhighlight %}

With this configuration in place I finally had my topic listeners setup and truly durable!
