const Router = require('koa-router')
const router = new Router()
const {authentication} = require('../controllers/session')

router.get('/', async (ctx) => {
  ctx.ok('Hello World.')
})

router.get('test', authentication, async (ctx) => {
  console.log(ctx.state.openid)
  ctx.ok('Session Established')
})

module.exports = router.routes()
