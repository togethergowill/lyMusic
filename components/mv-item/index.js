// components/mv-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onMvItemClick(){
      wx.navigateTo({
        url: `/pages/video-detail/index?id=${this.properties.itemData.id}`,
      })
    }
  },
})
