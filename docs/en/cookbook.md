---
title: Useful tips and scripts
---

## Open an offer link in a new tab and show a push subscription request in the old one
***Use case:*** 
A user clicks on a final button that redirects to the offer. The offer opens in a new browser tab. When the user goes back to the old tab where your landing page was, they get a push subscription request.

***Implementation:*** 
Integrate the Pushflow script [according to the standard instructions](feed_collect.md). 
Next, we add a ``toOffer`` function, which will open the offer in a new tab and set a cookie that the user has gone to the offer. Next, we check the ``onfocus`` event and when the user has opened the tab again we check if our cookie is there, and if it's true we request a push subscription:

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
In the script above, change ``https://trackdomain.com/click.php?lp=1`` to a link to your offer.




## Ask for a push subscription before redirecting from a landing page to an offer
***Use case:*** 
A user has reached the end of your landing page and clicks on a final button before redirect to an offer and a push subscription request appears. Regardless of whether the user subscribes or not, they are redirected to your offer.

***Implementation:*** 
Create a feed and in a section "Redirects settings" in each field, specify a link to your offer, for example, if your tracker is Binom and you use external landing pages, then in each field there will be a link: ``http://trackdomain.com/click.php?lp=1`` or if you use integrated landing pages: ``{offer_link}``. 



Next, we need to create a function that, instead of redirecting to the offer, will make a push subscription request and then a Pushflow script will redirect to the offer. Copy the code below into the ``<head></head>`` :
```
  <script>
    function toOffer(e) {
      e.preventDefault();
      PushflowSDK.askSubscription();
    }
  </script>
  ```
Next, find the button where the link to the offer is located and add an onclick event:
```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="toOffer(event)">Link</a>
```


