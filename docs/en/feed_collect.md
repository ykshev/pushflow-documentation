---
title: Collecting push subscriptions
---

## 1. Install Service Worker
First of all, regardless of the integration method you choose, you need to download the Service Worker file from your Feed page and upload it to the **root directory** of your web server on which you're planning to collect push subscriptions. As an example of the root directory with a service worker: https://your-domain.com/sw-pushflownet.js

## 2. Choose a way to collect subscriptions
### Javascript integration 
You need to copy the generated code from the Feed page and paste it into the ```<head></head>``` tag of your website. Please note that the script should be wrapped with a ```<script></script>``` tag


#### How to request a push subscription window? 
If you check "Ask for a subscription on a page load" then the subscription will be requested  1.8 seconds after the page is loaded. If you want to request a push subscription yourself, then you need to call ```PushflowSDK.askSubscription()``` function.

For example, if you want to call the subscription window by clicking on a button, then you can add a ```PushflowSDK.askSubscription()``` function call to the ```onclick``` event:
``` 
<div onclick="PushflowSDK.askSubscription()">Subscribe</div>
```

or, if you integrate into an already existing JS code, the function call may look like this:
```
function cta() {
  <!-- Some code goes here -->
  PushflowSDK.askSubscription();
}
```


### Ready-made landing pages
Another way to collect push subscriptions is to download one of the ready-made landing pages from the feed page and upload it to your web server