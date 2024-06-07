// components/ranking-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
    key: {
      type: String,
      value: "",
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
    onRankingItemTap(){
      const key = this.properties.key
      wx.navigateTo({
        url: `/pages/hot-songs/index?type=ranking&key=${ key }`,
      })
    }
  },
})
