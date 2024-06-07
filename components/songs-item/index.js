import musicPlayerBehavior from "../../behaviors/music-player"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId: {
      type: Number,
      value: 0,
    },
    index: {
      type: Number,
      value: 0,
    },
    name: {
      type: String,
      value: "默认歌曲名",
    },
    singer: {
      type: String,
      value: "周杰伦",
    },
  },
  behaviors: [musicPlayerBehavior],

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
})
