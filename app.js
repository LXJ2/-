// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 登录
  login: function () {
    wx.login({
      timeout: 10000,
      success: async (result) => {
        console.log(result.code);
        const token = await this.globalData.Api.user.login(result.code);
        wx.setStorageSync('token', token)
      },
      fail: () => {},
      complete: () => {}
    });
  },
  globalData: {
    host: 'http://localhost:8088',
    cartList: []
  },
})