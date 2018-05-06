const Router = require('koa-router')
const router = new Router()
const {
  authentication,
  generation
} = require('../controllers/session')

router.get('/', function hello(ctx) {
  let user = ctx.request
  ctx.ok({
    user
  })
})

router.get('/generate', generation)

router.get('/test', authentication, async (ctx) => {
  console.log(ctx.state.openid)
  ctx.ok('Session Established')
})

module.exports = router.routes()
