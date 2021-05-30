// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
   /*  wx.login({
      success: res => {
        if (res.code) {
          getApp().globalData.code = res.code; // 获得code 存入全局
          console.log(res.code);
          const token = res.code;
          wx.setStorageSync('token', token)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
          that.data.onLogin(); // 重新登录
        }
      },
    }); */
  },
  // 登录
 /*  onLogin() {
    const that = this;
    wx.login({
        success: res => {
            if (res.code) {
                app.globalData.code = res.code; // 获得code 存入全局
                try {
                    canIUseFlag = wx.canIUse('getSetting');
                } catch (canIuseEX) {}
                if (canIUseFlag) {
                    wx.getSetting({
                        // 获取用户的当前设置 判断是否授权
                        success: res => {
                            // 表示scope.userInfo这个权限已经授权。
                            if (res.authSetting['scope.userInfo']) {
                                // 调用wx.getUserInfo 获取用户信息
                                that.getUserInfo();
                            } else {
                                // 表示scope.userInfo这个权限未授权。
                                // 向用户发起 scope.userInfo 授权请求
                                wx.authorize({
                                    scope: 'scope.userInfo',
                                    success(rs) {
                                        // 调用wx.getUserInfo 获取用户信息
                                        that.getUserInfo();
                                    },
                                    fail(rs) {
                                        console.log(rs);
                                    },
                                });
                                util.hideLoading();
                                return;
                            }
                        },
                        fail(rs) {
                            console.log('用户暂未授权');
                        },
                    });
                }
            } else {
                that.onLogin();
            }
        },
        fail(rs) {
            that.onLogin();
        },
    });
    util.hideLoading();
},

// 获取用户信息
getUserInfo() {
    // 必须是在用户已经授权的情况下调用
    wx.getUserInfo({
        success: function (res) {
            let userInfo = res.userInfo;
            let wx_user_info = {
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender, //性别 0：未知、1：男、2：女
                province: userInfo.province,
                city: userInfo.city,
                country: userInfo.country,
            };
            wx.setStorageSync('wx_user_info', wx_user_info);
        },
    });
}, */
  globalData: {
    host: 'http://localhost:8088',
    cartList: [],
    addressList: []
  },
})