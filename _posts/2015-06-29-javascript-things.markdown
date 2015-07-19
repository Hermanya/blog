---
layout: post
title:  "Flow control hacks"
date:   2015-06-06 17:41:36
categories: thoughts
---

Hi. Through out my javascript hacking I see little awful patterns. Here are some of them.

{% highlight javascript %}
switch (trafficLight) {
    case 'red':
        stop();
        break;
    case 'yellow':
        finishIfInProgressOrWait();
        break;
    case 'green':
        go();
        break;
    default:
        throw new Error('color unknown');
}
{% endhighlight %}

⬆️ could be rewritten as ⬇️

{% highlight javascript %}
var strategies = {
        red: stop,
        yellow: finishIfInProgressOrWait,
        green: go
    }, handleInvalidColor = function () {
        throw new Error('color unknown');
    }, strategy = strategies[trafficLight] || handleInvalidColor;

strategy();
{% endhighlight %}

⬆️ there we have another one, and ⬇ something often used for *default* values ️

{% highlight javascript %}
strategy = strategies[light] || valueInCaseTheOtherIsFalsyLikeUndefined;
{% endhighlight %}

similarly to ⬆️  we can also do falsy checks ⬇️

{% highlight javascript %}
maybeDoStuff && maybeDoStuff();
{% endhighlight %}

unlike ⬆️, ⬇️ works only for `undefined`

{% highlight javascript %}
[valueOrUndefined].map(doStuff);
{% endhighlight %}

⬇️ last one

{% highlight javascript %}

function either (f) {
    return {
        or: function (defaultValue) {
            try {
                var value = f();
                if (value !== undefined) {
                    return value;
                } else {
                    return defaultValue;
                }
            } catch (error){
                return defaultValue;
            }
        }
    };
}
{% endhighlight %}
