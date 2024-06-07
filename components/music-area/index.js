// components/music-area/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu: {
      type: Array,
      value: [],
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
    onMusicAlbumClick(event) {
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/hot-songs/index?type=menu&id=${id}`,
      })
    },
  },
})
