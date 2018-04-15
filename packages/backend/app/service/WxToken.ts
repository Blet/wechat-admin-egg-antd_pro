import { Service } from "egg";

export default class WxToken extends Service {
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
}
