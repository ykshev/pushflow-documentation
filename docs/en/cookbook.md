---
title: Useful tips and scripts
---

## Requested push subscription before moving to an offer with prelanding
***Scenario:*** 
The user has reached the end of your landing page, clicks on the final button to go to the offer, and a push subscription request window appears. Regardless of which option they choose, they are redirected to your offer.

***Implementation:*** 
Create a Feed in Pushflow and in the "redirect settings" section, specify a link to your offer in each field. for example, if your tracker is Binom, then each field will contain a link like ` " `http://trackdomain.com/click.php?lp=1``. Save and integrate the generated script [according to the standard instructions](feed_collect.md).

In ```<head></head>``` we add the following script:
```
  <script>
    function toOffer(e) {
      e.preventDefault();
      PushflowSDK.askSubscription();
    }
  </script>
  ```
Next, find the button where your link to the offer is located and add the onclick event to it:
```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="toOffer(event)">Link</a>
```


## Open the offer in a new tab, and make a push subscription request in the old one
Integrating the Pushflow script [according to the standard instructions](feed_collect.md). Next in ``<head></head>`` adding the following script:
```
  <script>
    // Change it to your offer link
    var offerUrl = "https://trackdomain.com/click.php?lp=1";
    var isLeftPage = false;
    
    function toOffer(e) {
      e.preventDefault();
      var win = window.open(offerUrl, '_blank');
      if (win) {
          win.focus();
      } else {
          location.href = offerUrl;
      }
      isLeftPage = true;
    };

    window.onfocus = function() {
      if (isLeftPage) {
        setTimeout(PushflowSDK.askSubscription(), 500);
      }
    };
  </script>
```
In the script, change ``https://trackdomain.com/click.php?lp=1`` to your link to the offer.

It may also be that the user will forget about the old tab for a long time and then the script may not work. We can set the user a cookie for 31 days. Then the final script will look like this:
```
  <script>
    // Change it to your offer link
    var offerUrl = "https://trackdomain.com/click.php?lp=1";
    var isLeftPage = false;
    
    function toOffer(e) {
      e.preventDefault();
      var win = window.open(offerUrl, '_blank');
      if (win) {
          win.focus();
      } else {
          location.href = offerUrl;
      }
      isLeftPage = true;
      document.cookie = "isLeftPage=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
    };

    window.onfocus = function() {
      if (getCookie('isLeftPage') == 1 || isLeftPage) {
        setTimeout(PushflowSDK.askSubscription(), 500);
      }
    };

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
  </script>
```

The other option to request a subscription is to download a ready-made HTML template from the Feed page (a template with a captcha will do well), place it on your web server and redirect your user to this page after he opened the old tab. To do this, replace part of the script above ```window.onfocus = function() {}``` with the next one:
```
  window.onfocus = function() {
    if (isLeftPage) {
      location.href = "https://link.com/index.php";
    }
  };
```
Where ```https://link.com/index.php``` should be replaced with a link to the page where you collect subscriptions.



## Subscribe non-unique users
***Scenario:*** 
If a user has already visited your site, they are immediately prompted to subscribe.

***Implementation:*** 
Create Feed in Pushflow. If you want to leave all fields in the redirection section empty after the action with the subscription window. Integrate the Pushflow script [following the usual instructions](feed_collect.md).

If you want to ask for a subscription from users who have left your publishing to the offshore and not just visited the page, add the following script to ```<head></head>`:
```
<script>
  function setPushflowCookie() {
    document.cookie = "isLeftPage=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
  };

  window.addEventListener(
    "load",
    function() {
      if (getCookie('isLeftPage') == 1) {
        setTimeout(PushflowSDK.askSubscription(), 1500);
      }
    },
    true
  );

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
</script>
```
Find the button, where your link to the operator or tracker is and add it to the onclick event:
```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="setPushflowCookie()">Link</a>
```

If you want to ask for a subscription from all users who have logged in to your site and spent more than 3 seconds there, the script will look like this:
```
<script>
  window.addEventListener(
    "load",
    function() {
      setTimeout(setNonUniqCookeie(), 3000);

      if (getCookie('isNonUniq') == 1) {
        setTimeout(PushflowSDK.askSubscription(), 1500);
      }
    },
    true
  );

  function setNonUniqCookeie() {
    document.cookie = "isNonUniq=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
  };


  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
</script>
```
In this case, no additional scripts should be added to the button to go to the offshore.
<!-- 

## Subscription if URL parameter is present
***Scenario:*** 
We want the subscription script to trigger only if there is some key in the URL of the page, for example ```&p=1```. This can be useful during tests with and without a subscription, just take a double of the link in the tracker and add ```&p=1``` to it. Now you will see a subscription window in this branding and not a keyless one.

***Implementation:*** 
Integrate the Pushflow script [following the usual instructions](feed_collect.md). Next, in the integrated script we find the line ``` function PushflowSDK.askSubscription() {``` and below it we add the following condition ```if (window.location.href.indexOf('&p=1') < 0) return;```. As a result, we get the script of the view:
```
  ...
  function PushflowSDK.askSubscription() {
    if (window.location.href.indexOf('&p=1') < 0) return;
  ....
```
That's it.
## Параллельный сбор своей пуш-базы с другими сервисами пуш-подписок -->
