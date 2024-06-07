export default Behavior({
  methods: {
    navigateToMusicPlayer(event) {
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`,
      })
    },
  },
})
