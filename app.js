//app.js
import MiniRouter from './route/router'

App({
  onLaunch: function () {
    this.$router = new MiniRouter()
  },
  globalData: {
    userInfo: null
  }
})
