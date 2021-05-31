// component/grant.js
const app = getApp();
Component({
  options:{
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    ishow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏授权弹窗
    hideDialog(){
      this.setData({
        ishow: false
      })
    },
    //显示授权弹窗
    showDialog(){
      this.setData({
        ishow: true
      })
    },
    //授权
    getUserInfo(e){
      console.log(e);
      let detail = e.detail;
      if (detail.errMsg == "getUserInfo:fail auth deny") {
        wx.showToast({
          title: '请授权登陆',
          icon: 'none'
        })
      } else {
        this.setData({
          ishow: false
        })
        app.globalData.userInfo = detail.userInfo;
        wx.setStorage({
          key: 'userInfo',
          data: detail.userInfo,
        })
      }
      
    }
  }
})
