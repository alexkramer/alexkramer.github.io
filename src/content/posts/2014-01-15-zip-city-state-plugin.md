---
title: "Zip-City-State Plugin Released"
description: "A simple plugin to autocomplete city and state from a ZIP code"
date: 2014-01-15
categories: ["Grails"]
---

# [Zip-City-State Plugin](https://github.com/alexkramer/ZipCityState/)

I had a couple of applications that I wanted to be able to have the city and state populate when the 5 digit zip code was entered in order to streamline the process of filling out the form. There are some solutions out there that use little external services that are called from the javascript layer but I needed a solution that did not invoke an external service. I originally created this as an inline plugin but decided to publish it to the central repososity so that others may use it if they so choose. The design is such that you can easily utilize an external service if you would prefer.

Note: Due to licensing concerns no postal code data is packaged with this plugin.

## Installation Instructions

Add the following to the BuildConfig.groovy file of your Grails project:

```groovy
plugins {
    compile(":zip-city-state:1.0") {
        excludes 'jquery'
    }
}
```

The above assumes that you installed jQuery already in your project.  If you have not you can remove the excludes line.

## Implementation Instructions

### Maintain your own database

(1) Create a domain class with the zip code info (city,state,zip).
    A simple example can be found in the project source [ZipCode](https://github.com/alexkramer/ZipCityState/blob/master/grails-app/domain/grails/plugin/zipcitystate/ZipCode.groovy).
(2) Provide a service which implements the [CityStateLookup](https://github.com/alexkramer/ZipCityState/blob/master/src/main/groovy/grails/plugin/zipcitystate/CityStateLookup.groovy) interface.<a name="step2"></a>
    An example using the above domain class is provided in the project source [ZipCodeService](https://github.com/alexkramer/ZipCityState/blob/master/grails-app/services/grails/plugin/zipcitystate/ZipCodeService.groovy)
    and copied here:

    ```groovy
    class ZipCodeService implements CityStateLookup {

        @Override
        ZipCityState lookupByZip(String code) {
            def zipCode = ZipCode.findByCode(code)
            zipCode ? [code:zipCode.code,city:zipCode.city,state:zipCode.state] as ZipCityState : null
        }
    }
    ```
(3) Tell the plugin the name of the service bean you created in step 2

    zipcitystate.cityStateLookupService.beanName = 'zipCodeService'

(4) Place the tag to include the necessary js on your gsp (will use the resources plugin if installed in your application)

    <zipCode:resources/>

(5) Bind the javascript function and event to your zip code field. An example usage is provided below:

    ```javascript
    $("#zipField").ziplookup()
    .on('zipChange',function(event, state, city, zip) {
       //populate the city and state
       $("#cityField").val(city);
       $("#stateField").val(state);
       //automatically move the cursor to the field that comes next
       $("#phoneField").focus();
    })
    .on('zipNotFound',function(event,zip) {
        //maybe display something or just do nothing
        $("zipError").html('Zip not found!');
    });
    ```
(6) Test it out!

### Use an external service

Start at [step 2](#step2) above

# Sample Application

Good news! This plugin is also a fully functional sample application.  Simply download the source and fire it up.
