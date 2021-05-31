import { getProductData,getSwiper,navList } from '../api/home.js';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        navList: [],
        productData: []
    },
    toDetail(e) {
        let item = e.currentTarget.dataset.index;
        let url = encodeURIComponent(item.img)
        wx.navigateTo({url: '/pages/detail/detail?des='+item.des+'&img='+url+'&name='+item.name+'&price='+item.price+'&oldPrice='+item.oldPrice+'&tag='+item.tag+'&id='+item.id,})
    },
    /* toDetail(e){
        let item = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/detail/detail?id=1',
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function(data) {
                console.log(data)
              },
              someEvent: function(data) {
                console.log(data)
              }
            },
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
            }
          })
    }, */
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {    
        getProductData().then(data=>{
            this.setData({
                productData:data.data,
            })
        });
        getSwiper().then(data=>{
            this.setData({
                swiperList:data.data,
            })
        });
        navList().then(data=>{
            this.setData({
                navList:data.data,
            })         
        });
        let storageKey = wx.getStorageSync('userInfo');
        if(!storageKey){
        Dialog.confirm({
            title: '提示',
            message: '不授权无法完成购买，点击确度按钮开始授权',
            confirmButtonText:'去授权',
            cancelButtonText:'取消'
          }).then(() => {
              // on confirm
              wx.switchTab({
                url: '/pages/user/user',
                success: (result) => {
                }
            });
            })
            .catch(() => {
              // on cancel
            });
        }      
    },

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
    onReachBottom() {
        if (this.isReachBottom === false) {
            this.isReachBottom = true;
            getProductData().then(data=>{
                this.setData({
                    productData:data.data,
                })
                // console.log(data)
            });
        }
        console.log('到底了')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})