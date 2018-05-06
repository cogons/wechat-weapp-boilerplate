# Koa-Weapp-Session-Boilerplate

A simple Koa 2 boilerplate for Wechat Weapp Session Management.

## What's in the package?

* Wechat Weapp Session Management.
* HTTPS support.
* Parsing request with koa-bodyparser.
* CORS middleware with @koa/cors.
* koa-respond for helper functions on the context.
* koa-helmet for important security headers.
* nodemon for development to auto-restart when your files change.
* dotenv for environment variable management.

## Getting Started

```
git clone https://github.com/cogons/koa-weapp-session-boilerplate
cd koa-weapp-session-boilerplate
mv config.template.js config.js
vim config.js
npm run dev // or yarn dev
```

By default,

* the HTTP server starts on port 8001, http://localhost:8001.
* the HTTPS server starts on port 8002, https://localhost:8002.

### Prerequisites

* node >= v7.6.0