import { lyReqInstance } from "../request/index"

export function getSongDetailInfo(id){
	return lyReqInstance.get({
		url:"/song/detail",
		data:{
			ids:id
		}
	})
}

export function getPlayerLyricInfo(id) {
  return lyReqInstance.get({
    url: "/lyric",
    data: {
      id,
    },
  })
}
