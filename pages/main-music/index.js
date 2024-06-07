import throttle from "../../utils/throttle"
import { getBannerList, getSongMenuList } from "../../services/index"
import { selectQueryElement } from "../../utils/select-ele"
import hotSongsStore from "../../stores/hotSongsStore"
import rankingStore, { rankingMap } from "../../stores/rankingStore"
import playSongStore from "../../stores/playSongStore"
const querySelectElement = throttle(selectQueryElement, 100)

Page({
  data: {
    isRankingData: false,
    bannerHeight: 135,
    banners: [],
    recoSongList: [],
    hotSongMenu: [],
    recoSongMenu: [],
    rankingInfo: {},
  },
  onLoad() {
    this.fetchBannerList()
    // this.fetchRecSongList()
    this.fetchSongMenu()
    hotSongsStore.onState("hotSongsInfo", this.handleHotSongs)
    hotSongsStore.dispatch("fetchHotSongsInfoAction")
    // 使用of循环，监听ranking数据变化
    for (const key in rankingMap) {
      rankingStore.onState(key, this.handleRanking(key))
    }
    rankingStore.dispatch("fetchRankingDataAction")
  },

  // 获取banner数据
  async fetchBannerList() {
    const res = await getBannerList()
    this.setData({
      banners: res.banners,
    })
  },

  // 动态获取banner-image的高度
  onBannerImageLoad() {
    querySelectElement(".banner-image").then(res => {
      this.setData({
        bannerHeight: res[0].height,
      })
    })
  },

  // 把热歌数据前6条作为推荐歌曲
  // async fetchRecSongList() {
  //   const res = await getPlayListDetail(3778678)
  //   this.setData({
  //     recoSongList: res.playlist.tracks.splice(0, 6),
  //   })
  // },

  // 获取热门歌单和推荐歌单
  fetchSongMenu() {
    getSongMenuList().then(res => {
      this.setData({
        hotSongMenu: res.playlists,
      })
    })
    getSongMenuList("推荐").then(res => {
      this.setData({
        recoSongMenu: res.playlists,
      })
    })
  },
  // 跳转到热门歌曲推荐页面
  onRecoMoreClick() {
    wx.navigateTo({
      url: "/pages/hot-songs/index?type=recommend",
    })
  },

  // 跳转到歌单分类详情页面
  hotSonglistClick() {
    wx.navigateTo({
      url: "/pages/songlist-detail/index",
    })
  },

  // 数据共享，从store中获取数据
  handleHotSongs(value) {
    if (!value.tracks) return
    this.setData({
      recoSongList: value.tracks.splice(0, 6),
    })
  },
  handleRanking(ranking) {
    return value => {
      if (!value.name) return
      this.setData({ isRankingData: true })
      const rankingInfo = { ...this.data.rankingInfo, [ranking]: value }
      this.setData({
        rankingInfo,
      })
    }
  },
  getPlaySongList(e) {
    const index = e.currentTarget.dataset.index
    playSongStore.setState("playSongList", this.data.recoSongList)
    playSongStore.setState("playSongIndex", index)
  },
  onUnload() {
    hotSongsStore.offState("hotSongsInfo", this.handleHotSongs)
    for (const key in rankingMap) {
      rankingStore.offState(key, this.handleRanking(key))
    }
  },
})
