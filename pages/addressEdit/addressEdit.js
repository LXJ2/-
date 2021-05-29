// pages/addressEdit/addressEdit.js
// 引入地址大全
import { areaList } from '../../miniprogram_npm/@vant/area-data/index';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
/* const {
    globalData: {
        Api: {
            address: {
                addAddress,
                updateAddress
            }
        }
    }
} = getApp(); */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        updateAddress: null, //-1是新增 其他是修改
        receive_name: '',
        receive_phone: '',
        receive_region: '',
        receive_detail: '',
        tempRegion: [],
        isPop: false,
        areaList: areaList
    },
    nameFunc(event) {
        let value = event.detail;

    },
    phoneFunc(event) {
        let value = event.detail;
    },
    regionFunc(event) {
        let value = event.detail;
    },
    detailFunc(event) {
        let value = event.detail;
    },
    // 三级联动
    // 开启
    showPop() {
        this.setData({
            isPop: true
        });
    },
    // 关闭
    closePop() {
        this.setData({
            isPop: false
        });
    },
    // 选择地址
    changeArea(event) {
        console.log(event.detail.values);
        let address = event.detail.values.map(item => {
            return item.name
        });
        this.data.tempRegion = address;
    },
    // 确认选择地区
    confirmArea(event) {
        this.setData({
            receive_region: this.data.tempRegion.join(" "),
            isPop: false
        });
    },
    // 保存async
    saveBtn() {
        let {
            receive_name,
            receive_phone,
            receive_region,
            receive_detail
        } = this.data;
        if (!receive_name || !receive_phone || !receive_region || !receive_detail) {
            Toast("用户信息不完整");
            // 短震动
            wx.vibrateShort({});
            return;
        }
        // 判断新增还是修改
        if (!this.data.updateAddress) {
            // 新增
            /* let id = await addAddress({
                receive_name,
                receive_phone,
                receive_region,
                receive_detail
            }); */
            let ary = getApp().globalData.addressList;
            let obj = {
                receive_name: receive_name,
                receive_phone: receive_phone,
                receive_region: receive_region,
                receive_detail: receive_detail,
            };
            let bol = ary.filter(item => item.receive_detail == this.data.receive_detail)
            console.log(bol);
            if (bol.length) {
                Toast.fail('地址已经存在，无需重复添加');
            } else {
                ary.push(obj);
                wx.setStorage({
                    key:"addressList",
                    data:ary
                  })
                  Toast.success('新增成功');
            }
            
            // 返回到地址列表页
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.emit('fromAddressEditAdd', {
                receive_name,
                receive_phone,
                receive_region,
                receive_detail
            });
            wx.navigateBack({
                delta: 1
            });
            return;
        }
        // 修改
        let newAdress = {
            id: this.data.updateAddress.id,
            receive_name,
            receive_phone,
            receive_region,
            receive_detail,
            is_default: this.data.updateAddress.is_default
        };
        //await updateAddress(newAdress);
        Toast.success('修改成功');
        // 返回到地址列表页
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('fromAddressEditUpdate', newAdress);
        wx.navigateBack({
            delta: 1
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 从地址列表来 判断是新增还是修改
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('fromAddress', (data) => {
            let {
                receive_name,
                receive_phone,
                receive_region,
                receive_detail
            } = data;

            this.setData({
                updateAddress: data,
                receive_name,
                receive_phone,
                receive_region,
                receive_detail
            });
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