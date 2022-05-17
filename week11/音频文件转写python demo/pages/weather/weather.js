// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    // 1. 先获取用户的当前位置信息
    wx.getLocation({
      type: 'wgs84',// 地球坐标系
      success (res) {
        console.log(res)
        const latitude = res.latitude 
        const longitude = res.longitude
        // 2. 获取当前的结构化地址
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?parameters', //逆地理编码url
          data: {
            key: 'b0121f143057c2f0c3607e48fe21bac9',
            location: longitude+','+latitude
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
            const Component=res.data.regeocode.addressComponent
            that.setData({
              address:Component.province+Component.city+Component.district
            })
          }
        })
        // 3. 再获取当前的天气信息
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?', //仅为示例，并非真实的接口地址
          data: {
            key: 'f24409b043784067879a97242fb7def9',
            location: longitude+','+latitude
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
            that.setData({
              now:res.data.now
            })
          }
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