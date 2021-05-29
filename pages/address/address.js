import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

/* const {
    globalData: {
        Api: { 
            address: {
                getList,
                remove,
                set_default
            }
        }
    }
} = getApp(); */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: '',
        is_default:0
    },
    backOrder(event) {

    },
    // 返回到一个页面
    returnFloor() {
        wx.navigateBack({
            url:"pages/detail/detail"
        });
    },
    // 新增收货地址
    jumpEditor() {
        // 监听从地址编辑页面传来的数据
        const eventChannel = this.getOpenerEventChannel();
        wx.navigateTo({
            url: '/pages/addressEdit/addressEdit',
            events: {
                fromAddressEditAdd: (data) => {
                    data.is_default = 0;
                    this.data.list.push(data);
                    this.setData({
                        list: this.data.list
                    })
                }
            }
        });
    },
    // 订单确认页面使用
    selectAddress(event) {
        // 选择一个地址
        console.log(event);
        let id = event.currentTarget.dataset.id;
        let addressData = this.data.list.find(item => item.receive_detail === id);
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('fromOrderConfirm', addressData);
        wx.navigateBack({
            delta: 1
        });
    },
    // 删除某个地址
    removeAddress(event) {
        // 要删除的地址id
        let id = event.target.dataset.id;
        Dialog.confirm({
                title: '温馨提示',
                message: '确定要删除吗',
            })
            .then(async () => {
                // on confirm
                //await remove(id);
                // 更新页面表现
                let index = this.data.list.findIndex(item => item.id === id);
                this.data.list.splice(index, 1);
                this.setData({
                    list: this.data.list
                });
                Toast.success('删除成功');
            })
            .catch(() => {
                // on cancel
            });
    },
    // 修改某个地址
    updateAddress(event) {
        // 要修改的地址id
        let id = event.target.dataset.id;
        wx.navigateTo({
            url: '/pages/addressEdit/addressEdit',
            events: {
                fromAddressEditUpdate: (data) => {
                    console.log(data);
                    this.data.list.splice(this.data.list.findIndex(item => item.id === data.id), 1, {
                        ...data
                    });
                    this.setData({
                        list: this.data.list
                    });
                }
            },
            success: (result) => {
                result.eventChannel.emit('fromAddress', this.data.list.find(item => item.id === id))
            },
            fail: () => {},
            complete: () => {}
        });
  
    },
    // 设为默认地址
    defaultAddress(event) {
        // 要设置为默认地址id
        let id = event.target.dataset.id;
        Dialog.confirm({
                title: '温馨提示',
                message: '确定要修改吗',
            })
            .then( () => {
                let prepareDefault = this.data.list.find(item => item.receive_detail === receive_detail);
                if (prepareDefault.is_default === 1) {
                    Toast('已经是默认地址了');
                    return;
                }
                // on confirm
                //await set_default(id);
                let ary = getApp().globalData.addressList;
                ary.is_default = 1;
                // 取消默认地址
                let defaultItem = this.data.list.find(item => item.is_default === 1);
                if (defaultItem) defaultItem.is_default = 0;
                // 这是新的默认地址
                prepareDefault.is_default = 1;
                this.setData({
                    list: this.data.list
                });
                Toast.success('修改成功');
            })
            .catch(() => {
                // on cancel
            });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var curPages = getCurrentPages();
        console.log(curPages);
        //let list = await getList();
        //let list = getApp().globalData.addressList
        // 手机号码格式化
       /*  list.map((item) => {
            item.receive_phone = item.receive_phone.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2");
            return item;
        }) */
        let that = this;
        wx.getStorage({
            key: 'addressList',
            success (res) {
              console.log(res.data);
              that.setData({
                list: res.data
            });
            }
          })

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