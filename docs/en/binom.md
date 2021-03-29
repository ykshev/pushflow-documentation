---
title: Integration with Binom
---

## Collection of  push subscriptions
There are two ways to notify Binom that a push subscription has occurred. The first is to pass a [conversion postback to Binom](https://docs.binom.org/postback-url.php) with {clickid}. The second approach is to send a custom [Binom event](https://docs.binom.org/events.php) with information that a subscription has occurred.


### Notification of a push subscription through a postback 
This method is good if this is a push subscription campaign only. We can pass a conversion notifications to Binom via a [conversion postback](https://docs.binom.org/postback-url.php)


#### If you are using an integrated landing page
Then we use the built-in Binom tokens to pass data when initializing a script for push subscriptions. 
1. Copy the script from a feed page and paste it on your landing page according to the instructions on the feed page.
1. In the script, find the script initialization parameters and add tokens there. It might look like this (Note that the tokens are wrapped in quotation marks "" and there is a comma at the end of the string):
    ```
    ...
    var pushflowSettings = {
        clickid: "{clickid}",
        t1: "{trafficsource}",
        t2: "{campaign}",
        t3: "{lander}",
        vapidPublic: "BL1yzSD0uxSOg8TLsFgWdVUVlUN7_Vnuxpj1qvRrLDecE7FP9WvR_L0C3t5Dmz1hxtCtxw-I5hOcMBqr-3xJEug",
        feedId: "1"
    };
    ...
    ```
1. [Add a postback url on a pushflow feed page or in global settings](tracker#2-set-up-a-postback-url-on-pushflow). Your postback will look like: ```https://your-binom-domain.org/click.php?cnv_id={clickid}```

#### If you are using external landing pages
1. Pass ```{clickid}``` to the landing page via the URL parameter. This can be done in the landing page settings by adding to the landing's URL: ```&clickid={clickid}```. Our script automatically detects the ```{clickid}``` token in the URL of the landing and will pass it to our server along with a push subscription.
1. [Add a postback url on a pushflow feed page or in global settings](tracker#2-set-up-a-postback-url-on-pushflow). Your postback will look like: ```https://your-binom-domain.org/click.php?cnv_id={clickid}```



### Notification of a push subscription via Binom event
If you collect subscriptions in a campaign that are not created exclusively to collect push subscriptions, then it's a better approach to pass a push subscription conversation via a [Binom event](https://docs.binom.org/events.php).
1. Create a [Binom event]((https://docs.binom.org/events.php)) for push subscriptions
1. Modify our push subscription script. We need to add a successful subscription callback function and put a binom event there. It will look like this:
    ```
    ...
    var pushflowSettings = {
        onSuccessCallback: function() {
            var o = document.createElement("img");
            o.src='http://your-tracker-domain.net/click.php?event1=1';
        },
        vapidPublic: "BL1yzSD0uxSOg8TLsFgWdVUVlUN7_Vnuxpj1qvRrLDecE7FP9WvR_L0C3t5Dmz1hxtCtxw-I5hOcMBqr-3xJEug",
        feedId: "1"
    };
    ...
    ```
1. Replace the event number with the one you created earlier and replace the domain name.