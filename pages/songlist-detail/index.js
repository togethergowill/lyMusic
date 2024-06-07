import { getHotSonglistTags, getSongMenuList } from "../../services/index"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songlistMenu: [],
  },

  onLoad(options) {
    this.fetchHotSonglist()
  },

  async fetchHotSonglist() {
    const songlistMenu = []
    const res = await getHotSonglistTags()
    const tags = res.tags
    for (const tag of tags) {
      const menuRes = await getSongMenuList(tag.name)
      songlistMenu.push(menuRes)
    }
    Promise.all(songlistMenu).then(res => {
      this.setData({ songlistMenu: res })
    })
  },
})
