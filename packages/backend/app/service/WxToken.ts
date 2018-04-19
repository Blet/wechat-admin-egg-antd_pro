import { Service } from "egg";

class AccessToken {
  constructor(private accessToken: string, private expireTime: number) {
    this.accessToken = accessToken;
    this.expireTime = expireTime;
  }

  /*!
   * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比
   * Examples:
   * ```
   * token.isValid();
   * ```
   */
  isValid() {
    return !!this.accessToken && Date.now() < this.expireTime;
  }
}

export default class WxToken extends Service {
  private prefix = "https://api.weixin.qq.com/cgi-bin/";
  private store;
  async saveToken(token) {
    this.store = token;
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "Don't save token in memory, when cluster or multi-computer!"
      );
    }
  }

  async getToken() {
    return this.store;
  }

  checkSignature(timestamp: string, nonce: string, signature: string) {
    let { config, ctx } = this;
    let { helper } = ctx;
    // 需要将微信Token, timestamp, nonce 转换为数组，进行字典序排序后，通过sha1计算得出签名
    const text = [config.wxToken, timestamp, nonce].sort().join("");
    if (helper.crypto.sha1(text) === signature) {
      return true;
    }
    // 不通过签名，则为非法请求
    return false;
  }

  /*!
   * 根据创建API时传入的appid和appsecret获取access token
   * 进行后续所有API调用时，需要先获取access token
   * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=获取access_token> * 应用开发者无需直接调用本API。 * Examples:
   * ```
   * var token = await api.getAccessToken();
   * ```
   * - `err`, 获取access token出现异常时的异常对象
   * - `result`, 成功时得到的响应结果 * Result:
   * ```
   * {"access_token": "ACCESS_TOKEN","expires_in": 7200}
   * ```
   */
  async getAccessToken() {
    var url =
      this.prefix +
      "token?grant_type=client_credential&appid=" +
      this.config.appID +
      "&secret=" +
      this.config.appsecret;
    var data = await this.ctx.curl(url);

    // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
    var expireTime = Date.now() + (data.expires_in - 10) * 1000;
    var token = new AccessToken(data.access_token, expireTime);
    await this.saveToken(token);
    return token;
  }
  /*!
   * 需要access token的接口调用如果采用preRequest进行封装后，就可以直接调用。
   * 无需依赖 getAccessToken 为前置调用。
   * 应用开发者无需直接调用此API。
   * Examples:
   * ```
   * await api.ensureAccessToken();
   * ```
   */
  async ensureAccessToken() {
    // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
    var token = await this.getToken();
    var accessToken;
    if (
      token &&
      (accessToken = new AccessToken(
        token.accessToken,
        token.expireTime
      )).isValid()
    ) {
      return accessToken;
    }
    return this.getAccessToken();
  }
}
