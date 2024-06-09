import { HYEventStore } from 'hy-event-store' 
import { getPlayListDetail } from "../services/index"

const hotSongsStore = new HYEventStore({
	state:{
		hotSongsInfo:{}
	},
	actions:{
		fetchHotSongsInfoAction(state) {
			getPlayListDetail(3778678).then(res=>{
				state.hotSongsInfo = res.playlist
			})
		},
	}
	
})

export default hotSongsStore
