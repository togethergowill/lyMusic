import playSongStore from "../../stores/playSongStore"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    albumUrl: {
      type: String,
      value: "",
    },
    lyString: {
      type: String,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaySong: false,
  },
  lifetimes: {
    attached() {
      playSongStore.onState("isPlaySong", isPlaySong =>
        this.setData({ isPlaySong })
      )
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlayIconTap() {
      playSongStore.dispatch("onPlayClickAction")
    },
    onLyStringTap() {
      wx.navigateTo({
        url: "/pages/music-player/index",
      })
    },
  },
})
