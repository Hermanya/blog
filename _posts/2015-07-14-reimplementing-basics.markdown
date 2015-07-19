---
layout: post
title:  "Re-implementing basics"
date:   2015-07-17 17:41:36
categories: javascript
---
There is no reason to do this, but you can not deny that it is interesting.
Did you know, that `new` is not that special, and you could do it yourself?

{% highlight javascript %}
function myNew (constructor, options) {
    var instance = Object.create(constructor.prototype);
    constructor.call(instance, options);
    return instance;
}
{% endhighlight %}

I am not sure how to handle arguments without apply, because that would kind of defeat the purpose. Here is another way.

{% highlight javascript %}
Function.prototype.myCall = function (context, arg1, arg2, arg3isTooMuch) {
    context.magicalMethodName = this;
    return context.magicalMethodName(options, arg1, arg2, arg3isTooMuch);
}
{% endhighlight %}
