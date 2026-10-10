---
title: "Groovy Safe Navigation Operator Is a Null Check Not a Truth Check"
description: "Groovy Safe Navigation Operator Is a Null Check Not a Truth Check"
date: 2015-03-28
categories: ["Groovy"]
---

The Groovy Safe Navigation Operator is awesome. No one likes getting NPEs all over the place or having to add lots of if/else blocks to check for nulls. We use it frequently in the Grails application at my company and given the depth of the domain class relationships it is really useful (I would be surprised if any Groovy developer didn't swear by this operator's utility). Where I have seen this operator cause confusion is in the belief that it is a groovy truth navigator instead of a null safe navigator. I know I have been bitten by this a time or two in the beginning. Most of the time it has shown up in our project it was around domain class collections. If you have a Grails domain class that has a collection with nothing in it, accessing the collection will return an empty collection and not a null value. What does this mean in context of the safe navigator? What it means is that the collection will fly past the operator (since it is not null) and the next method call will be evaluated. If the next method call bombs on empty collections then you get a NoSuchElementException or something similar. To get around this you may just have to use our friend the ternary operator instead. See below for a concrete example.

```groovy
//First lets set up some data
class Person {
    String firstName
    String lastName
    List<Person> relatives
}

Person matriarch = new Person(firstName:'Thelma',lastName:'Johnson')
Person son = new Person(firstName:'Calvary',lastName:'Johnson')
Person daughter = new Person(firstName:'Tabitha',lastName:'Johnson')
matriarch.relatives = [son,daughter]

//next lets say we want to get the name of the first relative
//if we know that relatives should always exist, we can ignore null checks
assert matriarch.relatives.first().firstName == 'Calvary'

//now what if their are no known relatives?
matriarch.relatives.clear()
assert matriarch.relatives == []

//now lets ask again but this time lets use the operator
assert !matriarch.relatives?.first()?.firstName
//Guess what we get? java.util.NoSuchElementException: Cannot access first() element from an empty List
//If it was using groovy truth we may have thought that the above would succeed
//Thankfully in groovy land we have many alternative ways of writing this to avoid the error
assert ! (matriarch.relatives ? matriarch.relatives.first()?.firstName : null)
assert ! (matriarch.relatives*.firstName?.get(0))
assert ! (matriarch.relatives?.get(0)?.firstName)
assert ! (matriarch.relatives?.collect{it.firstName}?.get(0))
//The four options above will all work when the collection is explicitly null instead of empty
//If you know that the collection will never be null you could replace the ?.get(0) with the array annotation [0]
```