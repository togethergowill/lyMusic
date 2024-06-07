// components/music-album/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl: {
      type: String,
      value: "",
    },
    playCount: {
      type: Number,
      value: 999,
    },
    hasBottom: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: "底部文本标题默认值",
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
    albumClick() {
      this.triggerEvent('musicAlbum')
    },
  },
})
