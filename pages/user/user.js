import {getUserDetail} from '../api/home'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList: [],
        userInfo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
     
      let that = this;
      that.logo= that.selectComponent(".logo");
      //判断缓存中有没有授权信息，如果没有就显示弹窗，有就直接隐藏弹窗
      let storageKey = wx.getStorageSync('userInfo');
      console.log(storageKey);
      that.setData({
        userInfo:storageKey
      })
      console.log(that.data.userInfo);
      if (storageKey){
        wx.getStorage({
          key: 'userInfo',
          success: (res) => {
            if (res.data) {
              getApp().globalData.userInfo = res.data;
              that.logo.hideDialog();//调用子组件的方法
            }
          },
        })
      }else{
        that.logo.showDialog();//调用子组件的方法
      }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        getUserDetail().then(data => {
            this.setData({
                infoList:data.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})