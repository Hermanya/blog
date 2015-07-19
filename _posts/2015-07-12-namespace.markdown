---
layout: post
title:  "Namespacing, this and fp"
date:   2015-07-06 17:41:36
categories: thoughts
---

**TLDR**: there are many ways to do namespacing.

What is `this`? It is usually referred to, as context. Originally it comes from oop, where it represents an instance reference. It serves as a namespace for instance/static data and all inherited methods. Now this is crucial.

Why is that crucial? Inheritance provides code reuse. If two classes benefit from the same method, it can be abstracted out to the classes' ancestor. Then instances of both classes can reference that method through `this`. How does fp do inheritance? Wrong question.

How does fp do code reuse? Close. And how is that related to namespacing? Good. Modules. What is a module? Any value, such as a function, usually mapped to file system. A common function could be imported from another module. Cool. Or, you know, not cool.

Would the imported function then be in a class namespace? Good point. No, not just by importing it. There are `call`, `apply` and `bind` methods, to set `this` to any value, thus granting it namespace access. A clever solution to an interesting problem. Are we done?

Seriously? There is a mixin pattern though, which adds imported values into `this`. Hide the ugliness. What if there was some other way to pass data and related functions into an imported function? May be through parameters and lexical scope, what do you say?

So there are other ways to namespace things. Duh. We have context-dependent methods from oop, and context-independent functions from fp. Both are in javascript. Do we just stick to one of them, or use both, what are the options here.

How would you do fp with `this`? It should be possible. May be awkward. Let's see how we can apply some core concepts. Purity -- only use variables declared in a function's scope. Composition -- make a function, which invokes two functions, passing data through. Partial application -- make a function, which has some parameters predefined.

What about purity? Aside from using free variables, you also would forgo `this`. Even though technically it's bound to a function's scope, it does depend on the outer environment. Interestingly, functions, which do not make use of `this` do occur in oop, they are called static.

What about partial application? In javascript we have `bind`. The awkward part is that it not only sets parameters, but also context. Meaning, if we don't make use of context, we still have to set it. `doStuff.bind('unimportant context', usefulThing)`. Bozhe moi, it is ugly. Would not it be nice if we had something like `bindParameters`, also known as `curry`. Out of the box, that is.

How about composition? Below we have composition done the fp way.
{% highlight javascript %}
function composeFunctions (f, g) {
    return function (data) {
        return f(g(data));
    };
}
var drawEverything = composeFunctions(drawFigure, drawBackground);
//  where these two are would be of type canvasContext -> canvasContext
{% endhighlight %}
Pretty cool. The name is a little loong, but the dot notation is already taken. Since we don't have this in javascript, out of the box that is, anonymous wrapper functions are usually used. Such approach leads to much more function declarations in the code, more repetition, more nesting. Below I have a `composeMethods` implementation. It is rather funny.
{% highlight javascript %}
function composeMethods () {
    var methods = Array.from(arguments);
    return methods.reduce.bind(methods, function (context, method) {
        return method.call(context)
    }, this);
}

canvasContext.drawEverything = function () {
    return this.drawFigure('circle')
               .drawBackground();
}; // the way you would probably do it javascript

canvasContext.drawEverything = composeMethods(
    canvasContext.drawFigure.bindParameters('circle'),
    canvasContext.drawBackground
); // ugly, but interesting
{% endhighlight %}

As you see, even if you choose to go with `this`, as your namespacing choice, you can still do fp in javascript. It is just ugly out of the box. But solvable, solvable without doubt.
