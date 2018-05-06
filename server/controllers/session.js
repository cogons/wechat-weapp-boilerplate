const axios = require('axios');
const crypto = require('crypto');
const config = require('../config')

const generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

async function authentication (ctx, next) {
    let sessionId = ctx.request.query.sessionId
    let raw = await ctx.db.getAsync(sessionId)
    if(raw){
      let sessionInfo = JSON.parse(raw)
      ctx.state.openid = sessionInfo.openid
      next()
    } else {
      ctx.notFound('Session Not found');
    }
}

async function generation (ctx, next) {
    let code = ctx.request.query.code
    let oldSessionId = ctx.request.query.sessionId
    //let iv = ctx.request.query.iv
    let appId = config.appId;
    let appSecret = config.appSecret
    let path = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    let response = await axios.get(path)
    let sessionId = generate_key()
    let sessionDdl = Date.now() + 432000000 // Five days in ms
    if(oldSessionId){
        ctx.db.del(oldSessionId)
    }
    ctx.db.set(sessionId,JSON.stringify(response.data),'EX', 432000)
    ctx.ok({
        id: sessionId,
        ddl: sessionDdl
    })
}

module.exports = {
    authentication,
    generation
}