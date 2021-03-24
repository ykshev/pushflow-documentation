(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{126:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return u})),r.d(t,"default",(function(){return l}));var n=r(2),o=r(6),i=(r(0),r(147)),a=r(149),c={title:"Creating and setting up the feed"},s={id:"en/feed",isDocsHomePage:!1,title:"Creating and setting up the feed",description:"What is a feed",source:"@site/docs/en/feed.md",permalink:"/docs/en/feed",sidebar:"en",previous:{title:"Quick start",permalink:"/docs/"},next:{title:"Collecting push subscriptions",permalink:"/docs/en/feed_collect"}},u=[{value:"What is a feed",id:"what-is-a-feed",children:[{value:"How to create a feed",id:"how-to-create-a-feed",children:[]}]},{value:"Feed Properties",id:"feed-properties",children:[]},{value:"The &quot;Script settings&quot; section",id:"the-script-settings-section",children:[]}],p={rightToc:u};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"what-is-a-feed"},"What is a feed"),Object(i.b)("p",null,"Feed is where push subscriptions are stored. On the feed page, you have a unique javascript code that you need to copy and paste into your web page to start collecting push subscriptions."),Object(i.b)("h3",{id:"how-to-create-a-feed"},"How to create a feed"),Object(i.b)("p",null,"Go to the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://pushflow.net/app/feed"}),"Feed page")," and click on the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://pushflow.net/app/feed/create"}),"Create")," button in the upper right corner."),Object(i.b)("h2",{id:"feed-properties"},"Feed Properties"),Object(i.b)("h4",{id:"postback-url"},"Postback URL"),Object(i.b)("p",null,"After a new subscription is added to this feed, our server will send a postback to this address. ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/en/tracker"}),"Read more about available macros")),Object(i.b)("h4",{id:"frequency"},"Frequency"),Object(i.b)("p",null,"How often subscribers of this feed will receive push notifications. Specified in hours."),Object(i.b)("h2",{id:"the-script-settings-section"},'The "Script settings" section'),Object(i.b)("img",{alt:"Subscription request window",src:Object(a.a)("img/push-message.png"),style:{maxWidth:300}}),Object(i.b)("p",null,"Here you can set up redirects that will happen after the user has interacted with the push subscription window. Leave the fields blank if you do not want to redirect."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("em",{parentName:"p"},'Redirect URL when a user clicks "Allow"'),". The redirect will happen when the user has successfully subscribed to the push notification.")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("em",{parentName:"p"},'Redirect URL when a user clicks "Block" or if there is no support for push notifications'),". Specify a link that will be used to redirect if an error occurs while executing a push subscription script. (For example, if the user has completely forbidden push subscriptions in the browser, or if the user's browser does not support web push notifications)")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("em",{parentName:"p"},'"Block" button URL redirects loop'),'. Specify one or several URLs where the redirect will be made after clicking on the "Block" button in the push subscription window. If you want to specify several links that will be iterated over sequentially, then each link must be specified on a new line. How it works, read below. Specify only hostname. ',Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/en/feed_carosule"}),"Learn more about redirects loop"),".\nExample of the hostnames:"))),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"yourdomain.org\n1.yourdomain.org\n2.yourdomain.org\n3.yourdomain.org\n")))}l.isMDXComponent=!0},147:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return f}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},l=function(e){var t=p(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(r),d=n,f=l["".concat(a,".").concat(d)]||l[d]||b[d]||i;return r?o.a.createElement(f,c(c({ref:t},u),{},{components:r})):o.a.createElement(f,c({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var u=2;u<i;u++)a[u]=r[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},148:function(e,t,r){"use strict";var n=r(0),o=r(37);t.a=function(){return Object(n.useContext)(o.a)}},149:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(148),o=r(154);function i(e,{forcePrependBaseUrl:t=!1,absolute:r=!1}={}){const{siteConfig:{baseUrl:i="/",url:a}={}}=Object(n.a)();if(!e)return e;if(t)return i+e;if(!Object(o.a)(e))return e;const c=i+e.replace(/^\//,"");return r?a+c:c}},154:function(e,t,r){"use strict";function n(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}r.d(t,"a",(function(){return n}))}}]);