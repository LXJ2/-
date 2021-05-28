
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// Dialog 弹出框组件
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        isEditor: false
    },
    // 编辑完成切换
    opration() {
        this.setData({
            isEditor: !this.data.isEditor
        });
        if (this.data.isEditor) {
            // 完成 文字
            this.data.list.forEach(item => {
                item.editorChecked = item.checked;
                item.checked = false;
            });
        } else {
            // 编辑文字
            this.data.list.forEach(item => {
                item.checked = item.editorChecked;
            });
        }
        this.setData({
            list: this.data.list
        });
    },
    // 全选反选
    chengeAllChecked(event) {
        console.log(event);
        let checked = event.target.dataset.allChecked;
        this.data.list.forEach(item => {
            item.checked = !checked;
        })
        this.setData({
            list: this.data.list
        });
    },
    // 切换单个选中状态
    changeChecked(event) {
        let id = event.target.dataset.id;
        let list = this.data.list.find(item => item.id === id);
        list.checked = !list.checked;
        this.setData({
            list: this.data.list
        })
        console.log(event);

    },
    // 减 async
    decreaseHandeler(event) {
        console.log(event);
        // 当前要增加 减少 记录id
        let id = event.target.dataset.id;
        //await decrease(id);
        let itemData = this.data.list.find(item => item.id === id);
        itemData.count -= 1;
        this.setData({
            list: this.data.list
        });
    },
    // 加async
     increaseHandeler(event) {
        console.log(event);
        // 当前要增加 减少 记录id
        let id = event.target.dataset.id;
        // await increase(id);
        let itemData = this.data.list.find(item => item.id === id);
        itemData.count += 1;
        this.setData({
            list: this.data.list
        });
    },
    // 删除购物记录
    async removeCartList() {
        // 选中的购物记录id
        let ids = [];
        this.data.list.forEach(item => {
            if (item.checked) ids.push(item.id);
        });
        // 判断是否有选中的
        if (ids.length === 0) {
            Toast.fail("至少勾选一个");
            return;
        }
        // 执行删除操作
        /* await remove({
            ids
        }); */
        ids.forEach(id => {
            let index = this.data.list.findIndex(item => item.id === id);
            this.data.list.splice(index, 1);
        });
        this.setData({
            list: this.data.list
        });
        Toast.success("删除成功");
    },
    // 结算
    settleBtn() {
        // 组合选中的购物记录id
        let ids = [];
        this.data.list.forEach(item => {
            if (item.checked) ids.push(item.id);
        });
        if (ids.length === 0) {
            Toast.fail("请选择商品");
            return;
        }
        Dialog.confirm({
            title: "温馨提示",
            message: "确定要结算吗"
        }).then(res => {
            // 结算操作
            wx.navigateTo({
                url: '/pages/orderConfirm/orderConfirm',
                success: (result) => {
                    result.eventChannel.emit('settleIds', {
                        ids
                    })
                }
            });

        }).catch(err => {
            // 什么也不做
        })
    },
    // 跳转到首页
    toHome() {
        wx.switchTab({
            url: '/pages/home/home',
            success: (result) => {}
        });
    },
    // 返回上一页
    toBack() {
        if (app.globalData.toCartWay === "") {
            wx.switchTab({
                url: '/pages/home/home',
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        } else {
            wx.navigateTo({
                url: app.globalData.toCartWay,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
           this.setData({
               list:app.globalData.cartList
           })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示async 
     */
    onShow: function () {
        // 请求购物车记录
        // const list = await getList();
        let list = app.globalData.cartList;
        list.forEach(item => {
            item.checked = true;
            item.editorChecked = true;
        })
        console.log(list);
        this.setData({
            list
        })
        // 隐藏tabbar
        /* wx.hideTabBar({
            animation: true,
        }); */
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

    },
    onTabItemTap(item) {
        app.globalData.toCartWay = "";
    }
})