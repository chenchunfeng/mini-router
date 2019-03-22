//app.js
import MiniRouter from './route/router'

App({
  onLaunch: function (optinos) {
    this.$router = new MiniRouter()
    // console.log("options", optinos)
    // if (options) {
    //   wx.getShareInfo({
    //     shareTicket: options.shareTicket,
    //     success(res) {
    //       console.log("res: ", res)
    //     }
    //   })
    // }
  },
  globalData: {
    userInfo: null
  }
})
