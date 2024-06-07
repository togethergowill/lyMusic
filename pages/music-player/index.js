import { getPlayerLyricInfo, getSongDetailInfo } from "../../services/index"
import playSongStore from "../../stores/playSongStore"
import { parseLyric } from "../../utils/parseLyric"

const app = getApp()
// 1. 播放功能的制作
// 1.1  创建播放上下文，自动解析歌曲播放路径
const audioContext = wx.createInnerAudioContext()

const modeNames = ["order", "repeat", "random"]

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
    currentTime: 0,
    currentLyricIndex: 0,
    lyricScrollTop: 0,
    playSongList: [],
    playSongIndex: 0,

    currentIndex: 0,
    playMode: 0, //0 顺序播放  1 单曲循环 2 随机播放
    playModeName: "order",
    isPlaySong: true,
    isSliderChanging: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({
      id,
      contentHeight: app.globalData.contentHeight,
      screenHeight: app.globalData.screenHeight,
    })
    this.fetchSongDetailInfo()
    this.fetchPlayerLyricInfo()

    // 从playSongStore中获取播放列表
    playSongStore.onStates(
      ["playSongList", "playSongIndex"],
      this.getHandlerPlaySongInfo
    )

    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // 1.2 自动播放音频
    audioContext.autoplay = true
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChanging) {
        this.updateProgress()
      }
      const lyricInfo = this.data.lyricInfo
      if (!lyricInfo.length) return
      let index = lyricInfo.length - 1
      for (let i = 0; i < lyricInfo.length; i++) {
        if (audioContext.currentTime * 1000 <= lyricInfo[i].time) {
          index = i - 1
          break
        }
      }
      this.setData({
        currentLyricIndex: index,
        lyricScrollTop: index * 35,
      })

      audioContext.onWaiting(() => {
        audioContext.pause()
      })
      audioContext.onCanplay(() => {
        audioContext.play()
      })
    })
  },
  updateProgress() {
    const sliderValue =
      ((audioContext.currentTime * 1000) / this.data.durationTime) * 100
    this.setData({
      currentTime: audioContext.currentTime * 1000,
      sliderValue,
    })
  },

  async fetchSongDetailInfo() {
    const res = await getSongDetailInfo(this.data.id)
    this.setData({
      currentSong: res.songs[0],
      durationTime: res.songs[0].dt,
    })
  },

  async fetchPlayerLyricInfo() {
    const res = await getPlayerLyricInfo(this.data.id)
    this.setData({
      lyricInfo: parseLyric(res.lrc.lyric),
    })
  },

  onChangePlayMode() {
    let playIndex = this.data.playMode
    playIndex = playIndex + 1
    if (playIndex === 3) playIndex = 0
    if (playIndex === 1) {
      audioContext.loop = true
    } else {
      audioContext.loop = false
    }
    this.setData({
      playMode: playIndex,
      playModeName: modeNames[playIndex],
    })
  },
  onPrevTap() {
    this.switchCurrentPlaySong(false)
  },

  onNextTap() {
    this.switchCurrentPlaySong()
  },

  switchCurrentPlaySong(isNext = true) {
    let index = this.data.playSongIndex
    switch (this.data.playMode) {
      case 0:
        index = isNext ? index + 1 : index - 1
        break
      case 2:
        index = Math.floor(Math.random() * this.data.playSongList.length)
      default:
        break
    }

    const newPlaySong = this.data.playSongList[index]
    

    // 保存最新的index
    playSongStore.setState("playSongIndex", index)
  },

  // 2. 监听滑块点击事件
  onSliderChange(event) {
    audioContext.play()
    // 2.1  根据当前的sliderValue值计算出，currentTime值
    const value = event.detail.value
    const currentTime = (value / 100) * this.data.durationTime

    // 2.2  为播放上下文设置当前的播放值
    audioContext.seek(currentTime / 1000)
    this.setData({
      currentTime,
      isSliderChanging: false,
    })
  },

  onSliderChanging(event) {
    audioContext.play()
    this.data.isSliderChanging = true
    const value = event.detail.value
    const currentTime = (value / 100) * this.data.durationTime
    this.setData({
      currentTime,
      sliderValue: value,
    })
  },
  // 点击事件触发前，停止audioContext改变currentTime
  readyPause() {
    audioContext.pause()
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

  // 监听pause键的点击事件
  onPlayClick() {
    const isPlaySong = !this.data.isPlaySong
    this.setData({
      isPlaySong,
    })
    if (isPlaySong) {
      audioContext.play()
    } else {
      audioContext.pause()
    }
  },
  getHandlerPlaySongInfo({ playSongList, playSongIndex }) {
    this.setData({ playSongList, playSongIndex })
  },

  onUnload() {
    playSongStore.offStates(
      ["playSongList", "playSongIndex"],
      this.getHandlerPlaySongInfo
    )
  },
})