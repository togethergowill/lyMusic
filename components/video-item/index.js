// components/video-item/index.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  data: {},
  methods: {
    onVideoItemClick(){
      wx.navigateTo({
        url: `/pages/video-detail/index?id=${this.properties.itemData.id}`,
      })
    }
  },
})
