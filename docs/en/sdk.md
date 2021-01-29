---
title: Configuring JS script
---

### Script initialization
If you are confident enough with Javascript, you can initialize the Push flow API yourself. Otherwise, use the script constructor on the Feeds page.

#### Pushflow.init() options:
```
var pushflowSettings = {
  failedUrl: "https://failedurl.com",
  allowUrl: "https://allowUrl.com",
  denyUrls: ["denyUrls.com", "1.denyUrls.com", "2.denyUrls.com"],
  vapidPublic: "vapidpublic",
  feedId: "1",
  subscribeOnPageLoad: false,
  subscribeOnPageLoadDelay: 2000,
  isDebug: false,
  onSuccessCallback: function() {},
  onFailedCallback: function() {},
  onDeniedCallback: function() {},
  workerPath: "/sw-pushflownet.js",
  widgets: {
    isShowRobot: false,
    isShowDialog: false,
    dialogOptions: {
      position: 'top-center',
      isLockBackground: false,
      delay: 300,
      title: "We'd like to show you notifications for the latest updates",
      text: "",
      subscribeButton: "Allow",
      cancelButton: "Cancel",
      icon: "https://yourdomain.com/icon.png",
    },
    isLockBackground: false,
    lockBackgroundOptions: {
      isShowText: true,
      text: ""
    },
    isShowNotification: false,
    showNotificationOptions: {
      title: "Success"
    },
    isShowBubble: false,
    bubbleOptions: {
      text: "New Message Request",
      icon: "https://yourdomain.com/icon.png",
      delay: 500
    }
  }
};
```
