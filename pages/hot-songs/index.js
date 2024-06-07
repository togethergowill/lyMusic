import hotSongsStore from "../../stores/hotSongsStore"
import rankingStore from "../../stores/rankingStore"
import { getPlayListDetail } from "../../services/index"
import playSongStore from "../../stores/playSongStore"

Page({
  data: {
    title: "",
    hotSongsInfo: "",
    key: "newRanking",
    type: "ranking",
    id: "",
  },

  onLoad(options) {
    const type = options.type
    this.setData({ type })
    if (type === "recommend") {
      hotSongsStore.onState("hotSongsInfo", this.handleRanking)
    } else if (type === "ranking") {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === "menu") {
      const id = options.id
      this.data.id = id
      this.fetchPlayListDetail(id)
    }
  },
  handleRanking(value) {
    if (!value.name) return
    this.setData({
      title: value.name,
      hotSongsInfo: value,
    })
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  },
  async fetchPlayListDetail(id) {
    const res = await getPlayListDetail(id)
    this.setData({
      hotSongsInfo: res.playlist,
    })
  },
  getPlaySongList(e) {
    const index = e.currentTarget.dataset.index
    playSongStore.setState("playSongList", this.data.hotSongsInfo.tracks)
    playSongStore.setState("playSongIndex", index)
  },
  onUnload() {
    if (this.data.type === "recommend") {
      hotSongsStore.offState("hotSongsInfo", this.handleRanking)
    } else if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking)
    }
  },
})
