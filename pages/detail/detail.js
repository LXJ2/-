let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //item:'',
        des: '',
        img: "",
        name: "",
        oldPrice: "",
        price: "",
        tag: "",
        id: '',
        num: app.globalData.cartList.length
    },
    goCart() {
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },
    addCart() {
        let ary = app.globalData.cartList;
        let obj = {
            des: this.data.des,
            img: this.data.img,
            name: this.data.name,
            oldPrice: this.data.oldPrice,
            price: this.data.price,
            tag: this.data.tag,
            id: this.data.id,
            count: 1
        }
        let bol = ary.filter(item => item.id == this.data.id)
        console.log(bol);
        if (bol.length) {
            bol[0].count++
            wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 1000
            })
        } else {
            ary.push(obj);
            this.setData({
                num: ary.length
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            des: options.des,
            img: decodeURIComponent(options.img),
            name: options.name,
            oldPrice: options.oldPrice,
            price: options.price,
            tag: options.tag,
            id:options.id,
        })
        this.setData({
            num: app.globalData.cartList.length
          })
        /* console.log(options.query)
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('acceptDataFromOpenedPage', {
            data: 'test'
        });
        eventChannel.emit('someEvent', {
            data: 'test'
        });
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            console.log(data)
        }) */
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