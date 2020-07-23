(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{125:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return u})),r.d(t,"default",(function(){return l}));var n=r(2),i=r(6),o=(r(0),r(145)),a=r(147),c={title:"Creating and setting up the feed"},s={id:"en/feed",isDocsHomePage:!1,title:"Creating and setting up the feed",description:"What is Feed",source:"@site/docs/en/feed.md",permalink:"/docs/en/feed",sidebar:"en",previous:{title:"Quick start",permalink:"/docs/"},next:{title:"Collecting feed subscriptions",permalink:"/docs/en/feed_collect"}},u=[{value:"What is Feed",id:"what-is-feed",children:[]},{value:"How to create a feed",id:"how-to-create-a-feed",children:[]},{value:"Feed Properties",id:"feed-properties",children:[]},{value:"The &quot;Script settings&quot; section",id:"the-script-settings-section",children:[]}],p={rightToc:u};function l(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"what-is-feed"},"What is Feed"),Object(o.b)("p",null,"Feed - a place to store push subscriptions. Once it is created and set up, a unique JS-script will be generated for you, after placing it you will be able to collect push subscriptions in this feed."),Object(o.b)("h2",{id:"how-to-create-a-feed"},"How to create a feed"),Object(o.b)("p",null,"Go to the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://pushflow.net/app/feed"}),"Feed page")," of the main menu and click on the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://pushflow.net/app/feed/create"}),'"Create"')," button in the upper right corner."),Object(o.b)("h2",{id:"feed-properties"},"Feed Properties"),Object(o.b)("h4",{id:"title-and-description"},"Title and description"),Object(o.b)("p",null,"A random name and description to help you identify the group of subscriptions within this feed. Ideas for the name: traffic source, place to collect subscriptions, or collection method. "),Object(o.b)("h4",{id:"postback-url"},"Postback URL"),Object(o.b)("p",null,"After a new subscription is added to this feed, our server will send a request back to the specified address. ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/en/tracker"}),"Read more about available macros")),Object(o.b)("h4",{id:"frequency"},"Frequency"),Object(o.b)("p",null,"How often you can send notifications to one user. Specified in hours."),Object(o.b)("h2",{id:"the-script-settings-section"},'The "Script settings" section'),Object(o.b)("img",{alt:"Subscription request window",src:Object(a.a)("img/push-message.png"),style:{maxWidth:300}}),Object(o.b)("p",null,'The "Script settings" section determines where redirect will take place after user interaction with the subscription window.'),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},'Redirect when you press "Allow "'),'. Specify the link, which will be used as a redirect after a successful subscription of a user. (Click the "Allow" button).'),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Redirect if there is an error"),". Specify the link, by which redirect will be made, if an error occurs during the script execution. (For example, if the user has absolutely forbidden asking for the subscription window in his browser, or if the user's browser does not support web-bubble notification like in mobile Safari)."),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},'Requests by clicking "Deny"'),' Specify one or more hostnames where the redirect will be made after clicking on the "Block" button. If you want to specify several links that will be redirected sequentially, you should specify each link from a new line. How it works, read below.\nSpecify only the hostname, i.e. the site address without any additional parameters, which go after the sign ',Object(o.b)("em",{parentName:"p"},"?"),". For example, if your site is at https://",Object(o.b)("strong",{parentName:"p"},"yourdomain.org"),"/sub/4/index.php?search=1, then only specify the hostname ",Object(o.b)("strong",{parentName:"p"},"yourdomain.org")," and then subdomains from the new line. In the end, you can do it in this field:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"yourdomain.org\n1.yourdomain.org\n2.yourdomain.org\n3.yourdomain.org\n")))}l.isMDXComponent=!0},145:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return f}));var n=r(0),i=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=i.a.createContext({}),p=function(e){var t=i.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},l=function(e){var t=p(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(r),b=n,f=l["".concat(a,".").concat(b)]||l[b]||d[b]||o;return r?i.a.createElement(f,c(c({ref:t},u),{},{components:r})):i.a.createElement(f,c({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,a=new Array(o);a[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var u=2;u<o;u++)a[u]=r[u];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},146:function(e,t,r){"use strict";var n=r(0),i=r(37);t.a=function(){return Object(n.useContext)(i.a)}},147:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(146),i=r(152);function o(e,{forcePrependBaseUrl:t=!1,absolute:r=!1}={}){const{siteConfig:{baseUrl:o="/",url:a}={}}=Object(n.a)();if(!e)return e;if(t)return o+e;if(!Object(i.a)(e))return e;const c=o+e.replace(/^\//,"");return r?a+c:c}},152:function(e,t,r){"use strict";function n(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}r.d(t,"a",(function(){return n}))}}]);