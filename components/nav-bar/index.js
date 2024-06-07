// components/nav-bar/index.js
Component({
  options: {
    multipleSlots: true,
  },
  properties: {},

  data: {
    statusHeight: 0,
  },

  methods: {
    onLeftClick(){
      this.triggerEvent('goBackPreLevel')
    }
  },
  lifetimes: {
    attached() {
      const app = getApp()
      this.setData({
        statusHeight: app.globalData.statusHeight,
      })
    },
  },
})
