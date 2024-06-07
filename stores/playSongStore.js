import { HYEventStore } from "hy-event-store"

const playSongStore = new HYEventStore({
  state: {
    playSongList: [],
    playSongIndex: 0,
  },
})

export default playSongStore
