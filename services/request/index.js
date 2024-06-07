import { BASE_URL } from "./config"

class lyRequest {
  constructor(baseUrl = BASE_URL) {
    this.url = baseUrl
  }

  request(option) {
    const { url } = option
    return new Promise((resolve, reject) => {
      wx.request({
        ...option,
        url: this.url + url,
        success: res => {
          resolve(res.data)
        },
        fail: reject,
      })
    })
  }

  get(option) {
    return this.request({ ...option, method: "get" })
  }
  post(option) {
    return this.request({ ...option, method: "post" })
  }
}

export const lyReqInstance = new lyRequest()
