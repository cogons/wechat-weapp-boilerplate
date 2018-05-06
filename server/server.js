const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const redisStore = require('koa-redis');
const redis = require('redis');
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


//const session = require('koa-generic-session');
// const wxsession = require('koa-wxsession')
const app = new Koa()
const router = new Router()

let db = redis.createClient(6379, "127.0.0.1");

app.context.db = db

app.context.session = {}

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
