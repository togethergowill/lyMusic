import { HYEventStore } from "hy-event-store"
import { parseLyric } from "../utils/parseLyric"
import { getPlayerLyricInfo, getSongDetailInfo } from "../services/index"
import { throttle } from "underscore"

const audioContext = wx.createInnerAudioContext()
const modeNames = ["order", "repeat", "random"]
export const playDataArray = [
  "currentSong",
  "lyricInfo",
  "currentTime",
  "durationTime",
  "sliderValue",
  "currentLyricIndex",
  "lyricScrollTop",
  "currentIndex",
  "playMode",
  "playModeName",
  "isPlaySong",
  "isFistPlay",
  "limitNextRender",
]
const playSongStore = new HYEventStore({
  state: {
    currentSong: {},
    lyricInfo: [],

    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    currentLyricIndex: 0,
    lyricScrollTop: 0,
    playSongList: [],
    playSongIndex: 0,

    currentIndex: 0,
    playMode: 0, //0 顺序播放  1 单曲循环 2 随机播放
    playModeName: "order",
    isPlaySong: true,
    isFistPlay: true,
    limitNextRender: true,
    isSliderChanging: false,
  },
  actions: {
    renderPlayPage(cx, id) {
      this.dispatch("fetchSongDetailInfo", id)
      this.dispatch("fetchPlayerLyricInfo", id)
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 1.2 自动播放音频
      audioContext.autoplay = true
      if (cx.isFistPlay) {
        cx.isFistPlay = false
        audioContext.onTimeUpdate(() => {
          if (!cx.isSliderChanging) {
            this.dispatch("updateProgress")
          }
          const lyricInfo = cx.lyricInfo
          if (!lyricInfo.length) return
          let index = lyricInfo.length - 1
          for (let i = 0; i < lyricInfo.length; i++) {
            if (audioContext.currentTime * 1000 <= lyricInfo[i].time) {
              index = i - 1
              break
            }
          }
          cx.currentLyricIndex = index
          cx.lyricScrollTop = index * 35

          audioContext.onWaiting(() => {
            audioContext.pause()
          })
          audioContext.onCanplay(() => {
            cx.limitNextRender = true
            audioContext.play()
          })
          audioContext.onEnded(() => {
            if (audioContext.loop) return
            if (cx.limitNextRender) {
              this.dispatch("switchCurrentPlaySong")
            }
          })
        })
      }
    },

    switchCurrentPlaySong(cx, isNext = true) {
      cx.limitNextRender = false
      cx.isPlaySong = true
      let index = cx.playSongIndex
      const length = cx.playSongList.length
      switch (cx.playMode) {
        case 1:
        case 0:
          index = isNext ? index + 1 : index - 1
          if (index === length) {
            index = 0
          }
          if (index === -1) {
            index = length - 1
          }
          break
        case 2:
          index = Math.floor(Math.random() * length)
          break
      }
      const newPlaySong = cx.playSongList[index]
      this.dispatch("renderPlayPage", newPlaySong.id)

      // 保存最新的index
      this.setState("playSongIndex", index)
    },

    updateProgress(cx) {
      const sliderValue =
        ((audioContext.currentTime * 1000) / cx.durationTime) * 100
      cx.currentTime = audioContext.currentTime * 1000
      cx.sliderValue = sliderValue
    },
    async fetchSongDetailInfo(cx, id) {
      const res = await getSongDetailInfo(id)
      cx.currentSong = res.songs[0]
      cx.durationTime = res.songs[0].dt
    },

    async fetchPlayerLyricInfo(cx, id) {
      const res = await getPlayerLyricInfo(id)
      cx.lyricInfo = parseLyric(res.lrc.lyric)
    },
    onSliderChangeAction(cx, event) {
      // 2.1  根据当前的sliderValue值计算出，currentTime值
      const value = event.detail.value
      const currentTime = (value / 100) * cx.durationTime

      // 2.2  为播放上下文设置当前的播放值
      audioContext.seek(currentTime / 1000)
      cx.currentTime = currentTime
      cx.isSliderChanging = false
    },

    onSliderChangingAction: throttle(function (cx, event) {
      cx.isSliderChanging = true
      const value = event.detail.value
      const currentTime = (value / 100) * cx.durationTime
      cx.currentTime = currentTime
      cx.sliderValue = value
    }, 100),
    onChangePlayModeAction(cx) {
      let playIndex = cx.playMode
      playIndex = playIndex + 1
      if (playIndex === 3) playIndex = 0
      if (playIndex === 1) {
        audioContext.loop = true
      } else {
        audioContext.loop = false
      }
      cx.playMode = playIndex
      cx.playModeName = modeNames[playIndex]
    },
    onPrevTapAction() {
      this.dispatch("switchCurrentPlaySong", false)
    },

    onNextTapAction() {
      this.dispatch("switchCurrentPlaySong")
    },
    // 点击事件触发前，停止audioContext改变currentTime
    readyPauseAction(cx) {
      cx.isPlaySong = true
      audioContext.pause()
    },
    // 监听pause键的点击事件
    onPlayClickAction(cx) {
      if (!audioContext.paused) {
        audioContext.pause()
        cx.isPlaySong = false
      } else {
        audioContext.play()
        cx.isPlaySong = true
      }
    },
  },
})

export default playSongStore
export { audioContext }
