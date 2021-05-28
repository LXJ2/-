import {getMenuList,getMenuDetail} from '../api/home'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        menuList: [],
        menuDetail: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // console.log(getMenuList());
        getMenuList().then((data) => {
            that.setData({
                menuList: data.data
            })
            
            let menuId = that.data.menuList[that.data.activeKey].id;  
            // console.log(getMenuDetail(menuId));
            //that.getMenuDetail(menuId) 
            getMenuDetail(menuId).then((data)=>{
                this.setData({
                    menuDetail:data.data
                })
            })
        })
    },
    
    onChange(e) {
        var that = this;
        let menuId = that.data.menuList[e.detail].id;
        //that.getMenuDetail(menuId)
        getMenuDetail(menuId).then((data)=>{
            that.setData({
                menuDetail:data.data
            })
        })
    },
    /* getMenuDetail(menuId) {
        var that = this;
        wx.request({
            url: 'http://localhost:8088/api/xiaomi/menuDetail?id='+ menuId, //仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (data) {
                // console.log(data.data);
                that.setData({
                    menuDetail:data.data.data
                })
                // console.log(that.data.menuDetail);
            }
          })
    }, */
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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