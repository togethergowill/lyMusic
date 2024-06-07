import { lyReqInstance } from "../request/index"

export function getBannerList(type = 2) {
  return lyReqInstance.get({
    url: "/banner",
    data: {
      type,
    },
  })
}

export function getPlayListDetail(id) {
  return lyReqInstance.get({
    url: "/playlist/detail",
    data: {
      id,
    },
  })
}

export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
  return lyReqInstance.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset,
    },
  })
}

// 获取热门歌单tags
export function getHotSonglistTags() {
  return lyReqInstance.get({
    url: "/playlist/hot",
  })
}
