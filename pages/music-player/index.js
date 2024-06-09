import playSongStore, {
  playDataArray,
  audioContext,
} from "../../stores/playSongStore"

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 固定数据
    pageTitles: ["歌曲", "歌词"],
    contentHeight: 603,
    id: 0,
    currentSong: {},
    lyricInfo: [],

    // 动态数据
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    lyricScrollTop: 0,
    playSongList: [],
    playSongIndex: 0,
    playModeName: "order",
    currentIndex: 0,
    isPlaySong: true,
  },
  onLoad(options) {
    const id = options.id
    this.setData({
      id,
      contentHeight: app.globalData.contentHeight,
      screenHeight: app.globalData.screenHeight,
    })
    playSongStore.dispatch("renderPlayPage", id)

    // 从playSongStore中获取播放列表
    playSongStore.onStates(
      ["playSongList", "playSongIndex"],
      this.getHandlerPlaySongInfo
    )
    playSongStore.onStates(playDataArray, this.getHandlerPlayerInfos)
  },
  // 2. 监听滑块点击事件
  onSliderChange(event) {
    playSongStore.dispatch("onSliderChangeAction", event)
  },

  onSliderChanging(event) {
    playSongStore.dispatch("onSliderChangingAction", event)
  },
  onChangePlayMode() {
    playSongStore.dispatch("onChangePlayModeAction")
  },
  onPrevTap() {
    playSongStore.dispatch("onPrevTapAction", false)
  },

  onNextTap() {
    playSongStore.dispatch("onNextTapAction", false)
  },
  // // 点击事件触发前，停止audioContext改变currentTime
  readyPause() {
    playSongStore.dispatch("readyPauseAction")
  },

  goBackPreLevel() {
    wx.navigateBack()
  },
  onPageTitleItemClick(event) {
    this.setData({
      currentIndex: event.currentTarget.dataset.index,
    })
  },

  onSwiperChange(res) {
    this.setData({
      currentIndex: res.detail.current,
    })
  },

  // // 监听pause键的点击事件
  onPlayClick() {
    playSongStore.dispatch("onPlayClickAction", false)
  },
  getHandlerPlaySongInfo({ playSongList, playSongIndex }) {
    // 只有监听的值发生变化后，才会有新的值产生
    if (playSongList) {
      this.setData({
        playSongList,
      })
    }
    if (playSongIndex !== undefined) {
      this.setData({
        playSongIndex,
      })
    }
  },
  getHandlerPlayerInfos({
    currentSong,
    lyricInfo,
    currentTime,
    durationTime,
    lyricScrollTop,
    currentIndex,
    isPlaySong,
    playModeName,
    currentLyricIndex,
    sliderValue,
  }) {
    if (currentSong) this.setData({ currentSong })
    if (lyricInfo) this.setData({ lyricInfo })
    if (currentTime !== undefined) this.setData({ currentTime })
    if (durationTime !== undefined) this.setData({ durationTime })
    if (lyricScrollTop !== undefined) this.setData({ lyricScrollTop })
    if (currentIndex !== undefined) this.setData({ currentIndex })
    if (playModeName) this.setData({ playModeName })
    if (isPlaySong !== undefined) this.setData({ isPlaySong })
    if (currentLyricIndex !== undefined) this.setData({ currentLyricIndex })
    if (sliderValue !== undefined) this.setData({ sliderValue })
  },

  onUnload() {
    playSongStore.offStates(
      ["playSongList", "playSongIndex"],
      this.getHandlerPlaySongInfo
    )
  },
})
