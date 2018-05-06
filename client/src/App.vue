<script>
import fly from "@/utils/fly";
import WXP from 'minapp-api-promise'

async function wxlogin (sessionId) {
  let loginRes = await WXP.login()
  if (loginRes.code) {
    let session = await fly.get('https://localhost/time/session/generate',{
      code: loginRes.code,
      sessionId: sessionId
    })
    wx.setStorageSync('session', session)
  } else {
    console.log('登录失败！' + loginRes.errMsg)
  }
}

const notExpired = (ddl) => {
  return Date.now() < ddl
}

export default {
  async created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    const session = wx.getStorageSync('session')
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.checkSession({
      success: function () {
        if (session.ddl && notExpired(session.ddl)) {
          console.log('session_key 未过期')
        } else {
          console.log('session_key 过期')
          wxlogin(session.id)
        }
      },
      fail: function () {
        console.log('session_key 过期')
        wxlogin(session.id)
      }
    })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
