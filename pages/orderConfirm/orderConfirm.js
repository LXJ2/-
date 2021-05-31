import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ids: [],
        productList: [],
        addressData: ''
    },
    selectAddres() {
        wx.navigateTo({
            url: '/pages/address/address',
            events: {
                fromOrderConfirm: data => {
                    this.setData({
                        addressData: data
                    });
                }
            }
        });
    },
    goAddresEdit(){
        wx.navigateTo({
            url: '../addressEdit/addressEdit',
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
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
          })
    },
   getAdress() {
        // 首先获取默认地址
        /* let addressData = await get_default();
        if (addressData) {
            this.setData({
                addressData
            });
            return;
        } */
        // 获取全部地址
        let that = this;
        wx.getStorage({
            key: 'addressList',
            success (res) {
              console.log(res.data);
              let addressList = res.data;
              if (addressList.length > 0) {
                that.setData({
                    addressData: addressList[0]
                });
            }       
            }
          })
        // let addressList = getApp().globalData.addressList
        

    },
    /**
     * 
     * 生命周期函数--监听页面加载
     */
    onLoad:  function (options) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('settleIds',(data) => {    
            this.setData({
                ids:data.ids,
                productList: data.productList,
            });
            
        });
        this.getAdress();
        console.log(this.data.addressData);
    },
    submitOrder(event) {
        let that = this;
        Dialog.confirm({
                context: that,
                title: '订单提交提醒',
                message: '确认要提交订单吗',
            })
            .then(async () => {
                // on confirm
                if (!this.data.addressData) {
                    wx.showToast({
                        title: '请先添加地址',
                        icon: 'none',
                    });
                    return;
                }
                let data = {
                    ids: this.data.ids,
                    account: event.target.dataset.account,
                    address_id: this.data.addressData.id
                }
                //let orderId = await addOrderList(data);
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1500,
                    mask: false,
                    success: async (result) => {
                        await new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                            }, 1500);
                        });
                        wx.redirectTo({
                            url: `/pages/orderPay/orderPay`,
                            success: (result) => {

                            },
                            fail: () => {},
                            complete: () => {}
                        });
                    },
                    fail: () => {},
                    complete: () => {}
                });

            })
            .catch(() => {
                // on cancel
            });
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})