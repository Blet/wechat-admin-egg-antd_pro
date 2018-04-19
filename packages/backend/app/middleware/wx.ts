import { Context } from "egg";
export default function(options?) {
  if (typeof options !== "object") {
    options = {};
  }
  return async (ctx: Context, next) => {
    /**
     * only parse and set ctx.request.body when
     * 1. type is xml (text/xml and application/xml)
     * 2. method is post/put/patch
     */
    if (ctx.request.url.indexOf("/wx?") == -1) return;
    if (ctx.request.method == "GET") {
      let { config } = ctx.app;
      let { helper } = ctx;
      let { timestamp, nonce, signature } = ctx.query;
      // 需要将微信Token, timestamp, nonce 转换为数组，进行字典序排序后，通过sha1计算得出签名
      const text = [config.wxToken, timestamp, nonce].sort().join("");
      let bool = helper.crypto.sha1(text) === signature;
      if (bool) {
        ctx.body = ctx.query.echostr;
      } else {
        ctx.body = "非法请求";
      }
    } else if (ctx.request.method == "POST") {
      const { body } = ctx.request;
      const msgType = body.xml.MsgType;
      const event = body.xml.Event;
      let resbody;
      if (msgType === "event") {
        resbody = await ctx.service.wxEvent[event]();
      } else {
        resbody = await ctx.service.wxMessage[event]();
      }
      ctx.body = resbody;
    } else {
      next();
    }
  };
}
