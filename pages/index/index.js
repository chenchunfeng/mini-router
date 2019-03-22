//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function () {
    // console.log("onLoad", app.$router.currentPage)
  },

  onShow: function() {
    const params = app.$router.params
    if (!params) {
      return
    }
    if (params.isLogin === false) {
      console.log("app.$router.params.isLogin", params.isLogin)
      console.log("登录失败！！！")
    }
    if (params.data) {
      console.log("app.$router.params.data", params.data)
    }

  },

  handlePushLogs() {
    app.$router.push("logs", { log: "这是一个Log" })
  },

  handlePushLogin() {
    app.$router
      .push("login", { phoneNumber: "1561900000000" })
      .success(res => {
        console.log("success: ", res)
      })
  },

  handleSwitchMine() {
    app.$router.switchTab("mine")
      .success(res => {
        console.log("success: ", res)
      })
  },

  handleReLaunchArticle() {
    app.$router.reLaunch("article")
      .success(res => {
        console.log("success: ", res)
      })
  },

  handleRedirectLogin() {
    app.$router.redirect("login")
      .success(res => {
        console.log("success: ", res)
      })
  },

  onShareAppMessage(options) {
    // console.log(options)
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: "我的转发",
      path: app.$router.getPageFor('login').url
    }
  },


  /**
   * Query 方式传递参数
   */
  handlePushLogsQuery() {
    app.$router.push("logs", { log: "这是一个Log", name: "hellolad"}, 'query')
  },

  handlePushLoginQuery() {
    app.$router
      .push("login", { phoneNumber: "1561900000000" }, 'query')
      .success(res => {
        console.log("success: ", res)
      })
  },

  handleReLaunchArticleQuery() {
    app.$router.reLaunch("article", { articleId: '10002' }, 'query')
      .success(res => {
        console.log("success: ", res)
      })
  },

  handleRedirectLoginQuery() {
    app.$router.redirect("login", { phoneNumber: '1561900000000' }, 'query')
      .success(res => {
        console.log("success: ", res)
      })
  },

})
