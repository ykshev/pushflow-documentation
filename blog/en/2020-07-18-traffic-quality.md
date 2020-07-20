---
# id: score-traffic-quality2
title: How to evaluate traffic quality and catch bots using Javascript
# author: Pushflow
# author_title: Front End Engineer @ Facebook
# author_url: https://github.com/yangshun
# author_image_url: https://avatars0.githubusercontent.com/u/1315101?s=400&v=4
tags: [traffic quality, binom, bots]
---

Evaluating traffic quality will help us cut off junk traffic sources and sites without having to spend money on a comprehensive test. In this article, we will show the scripts that we use to evaluate the quality of traffic and understand the audience's interest in your landing page. We will use [Binom](https://cp.binom.org/aff/go/upor_defo) to manage our traffic and its [event system](https://docs.binom.org/events.php). If you use a different tracker, it probably has similar functionality and you can easily take the code from the article and adapt it to your tracker.

What are we going to do? We will perform various Javascript checks on the landing page to determine whether it is a "real" user or a bot that just clicks through your ad, or, for example, another affiliate who tries to steal your landing page using a proxy.

**So, two main tasks:**

1. Understand the amount of low-quality traffic
2. Understand the interest of live users in your landing page.
<!--truncate-->

**To do this, we will collect the following Events:**

1. Loading the page
2. User spent 3 seconds on the landing page
3. User spent 12 seconds on the landing page
4. Scroll on the page
5. Result of the click quality detection script
6. 100% bot detected

**Sending events to Binom**

Before starting, to simplify sending events to a binom, we will create a function that will pass the event number and its value to the tracker:

```jsx
// Replace the url with the URL of your binom tracker, without / at the end
var tracker_url = 'https://youtrackerurl.com';

function lp_callback(eventNumber, value) {
  var o = document.createElement("img");
  if (typeof window['getUclick'] === 'function') {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value + '&uclick=' + getUclick();
  } else {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value;
  }
}
```

Now, in order to pass an event, you need to call the ``lp_callback()`` function and pass two arguments to it: the event number and the value. For example, to pass ``event_8`` equal to ``1``, you need to call ``lp_callback(8,1)``

# Javascript checks

### 1. Page loading

A key parameter if your landing pages are not located on the same server as tracker. The script will pass a value equal to 1 to event_1:
```jsx
window.addEventListener("DOMContentLoaded", function () {
	lp_callback(1,1);
});
```

*DOMContentLoaded — occurs when all HTML has been fully loaded and passed by the parser, after which our lp_callback is triggered*

**Why is the page loading event one of the most important parameters for external landing pages??** 

First, we can use it to figure out how many clicks are lost before the page is loaded. We can influence this parameter by changes in our infrastructure, i.e. by moving servers with the tracker and landing pages closer to the user.

Secondly, we will calculate all other events based on this event. For example, now the landing page CTR (LP CTR) in Binom is calculated: all clicks that passed landing are divided into all clicks. But, for example, there may be good clicks on the zone, but for technical reasons the page loads for a long time, then the LP CTR will be extremely low. Therefore, we consider LP CTR as all clicks that broke through the landing page divided by clicks that loaded the page. More on this later.

### 2-3. User spent 3 or 12 seconds on the landing page

It helps us understand users' interest in our landing page. The event should start after the page loads, so we'll combine it with the script above

```jsx
window.addEventListener("DOMContentLoaded", function () {
	// Page loading, event_1
	lp_callback(1,1);

	// User spent 3 sec, event_2
  setTimeout(function () {
    lp_callback(2, 1)
  }, 3 * 1000);

	// User spent 12 sec, event_3
  setTimeout(function () {
    lp_callback(3, 1)
  }, 12 * 1000);
});
```

### 4. Scroll on the page
It will also help us understand the user's interest in your landing

```jsx
// Scroll, event_4
var scroll = 0;
window.onscroll = function () {
  if (scroll != 1) {
    scroll = 1;
    lp_callback(4, 1)
  }
};
```

### 5-6. Click quality detection script
There will be some magic here. Each affiliate has some set of JS checks that they run on a landing to detect bot traffic, for example: whether ``navigator.platform`` matches the user agent, whether there are Java or other plug-ins in the browser, but we only have 10 events in Binom and it makes no sense to send all the values there. And here is some magic comes to play, a script from [Pushflow](https://pushflow.net/app/) to evaluate the quality of traffic. This script makes 35 such checks in the browser and another five on the server. This allows you to determine with a high probability the replacement of the user agent in the browser, the presence of proxy or VPN signs in the connection, various bots, headless browsers, incognito mode, etc. The script loads asynchronously, without blocking the page, and performs everything in the background, i.e. it does not affect the page loading speed in any way. The script performs all its checks and as a result gives the user a score from 0 to 1. You can read more about the script in [Pushflow client area](https://pushflow.net/app/trafficquality).


So, let's start integration. To do this, we will use two events in the Binom:

event_5 — those who did not pass the basic quality check: people behind proxies, VPN, suspicious browsers and devices or OS, but there may be quite live converting users.

event_6 — those who are definitely a bot or unwanted user. We will pass data from all sources to this event, if it is definitely a low-quality user. If you use a server based services to detect bots or other services, we will send data from them to this event.

So, if the script for evaluating the quality of traffic from Pushflow returns a value less than 1, then we save it to suspicious users, if the value is less than or equal to 0.4, then to bots. Read More about gradation in the [Pushflow client area](https://pushflow.net/app/trafficquality)

```jsx
function pushflowCallback(result) {
	// All clicks with a quality less than 1 are recorded as suspicious, event_5
  if (result.quality < 1) { lp_callback(5, 1); }

	// All clicks with a quality less than or equal to 0.4 are recorded in bots, event_6
  if (result.quality <= 0.4) { lp_callback(6, 1); }
}

// Completely replace the line below with the exact same line from the Pushflow client area
// (function (d, t){ var s=d.createEle....
```

To make this script work, we need to copy the generated code from the [Pushflow client area](https://pushflow.net/app/trafficquality) and replace the ``pushflowCallback`` function in it with the example above.

At this point, we will finish collecting events and move on to configuring formulas in Binom itself.


## Formulas in Binom

After passing events to the Binom, we need to create columns there to display the transmitted data. To do this, go to the tracker in the section "Settings > Statistics > Columns".

### Custom **LP CTR**

The first thing we will do is add a new LP CTR formula. The standard formula looks like ``lp_clicks/clicks*100``. First, it is logical to see LP CTR only for clicks that have a page loaded (i.e. the user saw what was offered to them and reached the end), and secondly, we are not interested in when LP CTR is called by bots and thus inflate it, it makes sens to remove them from this formula.

**The new formula will look like this:** 

(LP Clicks - Bots)/(Page Loaded - Bots)*100

Under bots, we can consider 100% of bots or suspicious users, i.e. event_5 or event_6, here everyone chooses for themselves, we will stop at event_6 (100% bot).

**The final formula in Binom:**
``((lp_clicks-event_6)/(event_1-event_6))*100``

### Loaded, %
Our key event is page loading for the user:

**The final formula in Binom:**
``event_1/clicks*100``

### 3s and 12s

The user spent 3 seconds on the site. **Here you should note** that we do not divide event_2 by all clicks, but only by those who have the page loaded, i.e. by event_1

**Final formula for 3s in Binom:**
``event_2/event_1*100``

**Final formula for 12s in Binom:**
``event_3/event_1*100``


### Scroll

**The final formula in Binom:**
``event_4/event_1*100``

### Quality

In event_5, we passed the value 1 for all suspicious users: who uses VPN or proxy, whose browser does not pass certain checks for a live user, and so on. Let's create a formula that shows how many normal users you have left.

**The final formula in Binom:**
``100-event_5/event_1*100``


### Bots
Clicks that we are sure are garbage traffic. If we send data from the server-side bot protection system to this event, then we need to divide event_6 by all clicks, if we get data only from the Pushflow script, then by event_1.

**The final formula in Binom:**
``event_6/clicks*100``


### Usage

With all the collected data, we can try to output an abstract formula that will show the user's interest in a specific landing page. To do this, take the ratio of parameters such as: 3 seconds on the page, scroll, LP CTR (LP CTR is an important indicator, so we will make it a coefficient of x2). Add all these parameters, divide by their sum number, and multiply by 10 to make it beautiful. This will be a fairly subjective, but useful indicator, which allows us to see zones and traffic sources that are very out of the picture.

**The final formula in Binom:**
``(event_2/event_1+event_4/event_1+((lp_clicks-event_6)/(event_1-event_6))*2)/3*10``


### Not Unique, %

As a bonus, we will also add % of non-unique users (for some reason, the standard Binom does not have this):

**The final formula in Binom:**
``(clicks-unique_clicks)/clicks*100``

## **Final Javascript**

Replace in the script below:

1. tracker_url to the link with your tracker's domain
2. Insert the generated code from the [Pushflow client area](https://pushflow.net/app/trafficquality) and replace the ``pushflowCallback`` function with the function from our example

```jsx
// Replace the url with the URL of your tracker, without / at the end
var tracker_url = 'https://youtrackerurl.com';

function lp_callback(eventNumber, value) {
  var o = document.createElement("img");
  if (typeof window['getUclick'] === 'function') {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value + '&uclick=' + getUclick();
  } else {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value;
  }
}

window.addEventListener("DOMContentLoaded", function () {
	// Page loading event
	lp_callback(1,1);

	// 3 seconds event
  setTimeout(function () {
    lp_callback(2, 1)
  }, 3 * 1000);

	// 12 seconds event
  setTimeout(function () {
    lp_callback(3, 1)
  }, 12 * 1000);
});

// Scroll event
var scroll = 0;
window.onscroll = function () {
  if (scroll != 1) {
    scroll = 1;
    lp_callback(4, 1)
  }
};

function pushflowCallback(result) {
	// All clicks with a quality less than 1 are recorded as suspicious, event_5
  if (result.quality < 1) { lp_callback(5, 1); }

	// All clicks with a quality less than or equal to 0.4 are recorded in bots, event_6
  if (result.quality <= 0.4) { lp_callback(6, 1); }
}

// Completely replace the line below with the exact same line from the Pushflow client area
// (function (d, t){ var s=d.createEle....
```
Let's take the code above and [minimize](https://javascript-minifier.com/) it. Next, we wrap the resulting code in the ``<script></script>`` tag and insert it all to our page inside the ``<header></header>`` tag.

You should get something like this (the code below is not working, read above what you need to do):
```
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="utf-8">
		<title></title>
		<meta name="description" content="">
		<meta name="author" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="">
		<script>
			var tracker_url="https://youtrackerurl.com";function lp_callback(c,l){var t=document.createElement("img");"function"==typeof window.getUclick?t.src=tracker_url+"/click.php?event"+c+"="+l+"&uclick="+getUclick():t.src=tracker_url+"/click.php?event"+c+"="+l}window.addEventListener("DOMContentLoaded",function(){lp_callback(1,1),setTimeout(function(){lp_callback(2,1)},3e3),setTimeout(function(){lp_callback(3,1)},12e3)});var scroll=0;function pushflowCallback(c){c.quality<1&&lp_callback(5,1),c.quality<=.4&&lp_callback(6,1)}window.onscroll=function(){1!=scroll&&(scroll=1,lp_callback(4,1))};
		</script>
	</head>
<body>
```