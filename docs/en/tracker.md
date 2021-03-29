---
title: Setting up the tracker, postback, macros
---


## Postback when collecting push subscriptions
When collecting push subscriptions, you can pass the ```clickid``` from your tracker to Pushflow, and after a successful subscription, get it back via a callback from Pushflow. You can also send additional tokens(```t1, t2, t3, t4, t5``` ) that you can get back when you send push notifications to users later.


### How it works:
#### 1. Pass tokens with a push subscription
To pass tokens, they must be in the url of the page where the push subscription is taking place. Our push subscription script will automatically get available tokens from the URL (```clickid, t1, t2, t3, t4, t5```) and pass them with a successful subscription to our database. For example, if you want to pass ```clickid, t1, t2``` the URL might look like this: ```https://script-domain.com/index.php?clickid=8280816987&t1=propellers&t2=dating```
#### 2. Set up a postback URL on Pushflow
To get tokens back, add a postback URL on Pushflow:
- You can add a callback on the feed page and it will only apply to that feed.
- Or you can add a global postback in [Pushflow profile settings](https://pushflow.net/app/options). It will apply to all feeds that don't have a postback URL.


## Macros when sending notifications
During creative creation, you can add additional macros to a link that pass values that you passed along with the push subscription and a few macros from the Pushflow:
- ```{externalId}``` — Click ID in Pushflow
- ```{сampaignId}``` — Campaign ID in Pushflow
- ```{creativeId}``` — Creative ID in Pushflow
- ```{feedId}``` — Feed ID in Pushflow
- ```{subscriptionId}``` — Subscription ID in Pushflow
- ```{days}``` — Number of days since the subscription occurred
- ```{clickid}``` — clickid token received from the subscription page
- ```{t1}``` — t1 token received from the subscription page
- ```{t2}``` — t2 token received from the subscription page
- ```{t3}``` — t3 token received from the subscription page
- ```{t4}``` — t4 token received from the subscription page
- ```{t5}``` — t5 token received from the subscription page