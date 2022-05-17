// pages/around/around.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    around_poi:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: 'https://restapi.amap.com/v3/place/around?parameters', //高德搜索POI-周边
      data: {
        key: 'b0121f143057c2f0c3607e48fe21bac9',
        location: '113.678280,23.628439',
        keywords: '中餐厅' //可选
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)// 好比是python中的print
        that.setData({
          around_poi:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})