import { getVideoList } from "../../services/index"
Page({
  data: {
    videoList: [],
    hasMore: true,
    offset: 0,
  },
  onLoad() {
    this.fetchVideoList()
  },
  async fetchVideoList() {
    const res = await getVideoList(this.data.offset)
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({
      videoList: newVideoList
    })
    this.data.hasMore = res.hasMore
    this.data.offset = this.data.videoList.length
  },
  onReachBottom() {
    if (!this.data.hasMore) {
      wx.showToast({
        title: "没有更多内容了",
        duration: 1000,
        icon: "error",
      })
      return
    }
    this.fetchVideoList()
  },
  async onPullDownRefresh() {
    this.setData({ videoList: [] })
    this.data.offset = 0
    this.data.hasMore = true

    await this.fetchVideoList()
    
    wx.stopPullDownRefresh()
  },
})
