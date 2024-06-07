import musicPlayerBehavior from "../../behaviors/music-player"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  behaviors:[ musicPlayerBehavior ],

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
})
