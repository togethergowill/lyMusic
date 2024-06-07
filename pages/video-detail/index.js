import {
  getMvDetailInfo,
  getMvDetailUrl,
  getRelatedMvList,
} from "../../services/index"
Page({
  data: {
    id: 0,
    mvDetailUrl: "",
    mvDetailInfo: {},
    relatedMvData: {
      cover:
        "https://p1.music.126.net/ijUg7s_2S8GMbTNsYiepJA==/18676304511774727.jpg",
      id: 5436712,
      title: "亲爱的热爱的ballball你，韩商言你可闭嘴吧",
      name: "莫文蔚",
      playCount: 815007,
      mv: {
        videos: [{ duration: 378040 }],
      },
    },
  },

  onLoad(options) {
    this.data.id = options.id
    this.fetchMvDetailUrl()
    this.fetchMvDetailInfo()
    this.fetchRelatedMvList()
  },
  // 1. 获取mv地址
  async fetchMvDetailUrl() {
    const res = await getMvDetailUrl(this.data.id)
    this.setData({
      mvDetailUrl: res.data.url,
    })
  },
  // 2. 获取mv详细信息
  async fetchMvDetailInfo() {
    const res = await getMvDetailInfo(this.data.id)
    this.setData({
      mvDetailInfo: res.data,
    })
  },
  // 3. 获取相关的mv列表
  async fetchRelatedMvList() {
    const res = await getRelatedMvList(this.data.id)
  },
})
