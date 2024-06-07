import { lyReqInstance } from "../request/index"

export function getVideoList(offset = 0, limit = 20) {
  return lyReqInstance.get({
    url: `/top/mv?offset=${offset}&limit=${limit}`,
  })
}

export function getMvDetailInfo(id) {
  return lyReqInstance.get({
    url: `/mv/detail?mvid=${id}`,
  })
}

export function getMvDetailUrl(id) {
  return lyReqInstance.get({
    url: `/mv/url?id=${id}&r=1080`,
  })
}

export function getRelatedMvList(id) {
  return lyReqInstance.get({
    url: `/related/allvideo`,
    data:{
      id
    }
  })
}
