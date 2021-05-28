// components/mi_count/mi_count.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: Number,
        maxSize: {
            type: Number,
            value: 5
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        decreaseHandeler() {
            if (this.data.count === 1) {
                wx.showToast({
                    title: '亲~最少为1个哦',
                    icon: "none"
                });
                return;
            }
            this.triggerEvent("decrease");
        },
        increaseHandeler() {
            if (this.data.count >= this.data.maxSize) {
                wx.showToast({
                    title: '已超出最大数量',
                    icon: "none"
                });
                return;
            }
            this.triggerEvent("increase");
        }
    }
})