---
title: Push subscription carousel
---

#### What is this?
After clicking on the "Block" button in the push subscription request, we will redirect the user to a subdomain of the exact same website, where the push subscription request will be made again.


#### How to set it up

1. **Add DNS records to your domain.** In your domain's DNS records, create a series of subdomains pointing to the same IP address. For example, if your primary domain is _yourdomain.org_, then create subdomains: _1.yourdomain.org_, _2.yourdomain.org_, _3.yourdomain.org_ pointing to exactly the same IP address as _yourdomain.org_. Make sure the subdomains are up and running exactly the same site as the main domain _yourdomain.org_
2. **Set up your feed.** On the Feed Page, fill in the _"Block" button URL redirects loop_ field with your main domain and all its subdomains. (Each on a new line)

Next, download one of the ready-made landing pages from the feed page or embed a script as usual. That's it.
When there are no domains left, a redirect will occur as if user clicked _Block_ button