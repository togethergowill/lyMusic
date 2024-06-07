import { HYEventStore } from "hy-event-store"
import { getPlayListDetail } from "../services/index"

export const rankingMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756,
}

const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    originRanking: {},
    upRanking: {},
  },
  actions: {
    fetchRankingDataAction(state) {
      for (const key in rankingMap) {
        const id = rankingMap[key]
        getPlayListDetail(id).then(res => {
          state[key] = res.playlist
        })
      }
    },
  },
})

export default rankingStore

