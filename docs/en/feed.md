---
title: Creating and setting up the feed
---
import useBaseUrl from '@docusaurus/useBaseUrl';


## What is a feed
Feed is where push subscriptions are stored. On the feed page, you have a unique javascript code that you need to copy and paste into your web page to start collecting push subscriptions.

### How to create a feed
Go to the [Feed page](https://pushflow.net/app/feed) and click on the [Create](https://pushflow.net/app/feed/create) button in the upper right corner.

## Feed Properties
 
#### Postback URL
After a new subscription is added to this feed, our server will send a postback to this address. [Read more about available macros](tracker.md)

#### Frequency
How often subscribers of this feed will receive push notifications. Specified in hours.

## The "Script settings" section
<img alt="Subscription request window" src={useBaseUrl('img/push-message.png')} style={{maxWidth: 300}} />

Here you can set up redirects that will happen after the user has interacted with the push subscription window. Leave the fields blank if you do not want to redirect.


* *Redirect URL when a user clicks "Allow"*. The redirect will happen when the user has successfully subscribed to the push notification.

* *Redirect URL when a user clicks "Block" or if there is no support for push notifications*. Specify a link that will be used to redirect if an error occurs while executing a push subscription script. (For example, if the user has completely forbidden push subscriptions in the browser, or if the user's browser does not support web push notifications)

* *"Block" button URL redirects loop*. Specify one or several URLs where the redirect will be made after clicking on the "Block" button in the push subscription window. If you want to specify several links that will be iterated over sequentially, then each link must be specified on a new line. How it works, read below. Specify only hostname. [Learn more about redirects loop](feed_carosule.md).
Example of the hostnames:

```
yourdomain.org
1.yourdomain.org
2.yourdomain.org
3.yourdomain.org
```

