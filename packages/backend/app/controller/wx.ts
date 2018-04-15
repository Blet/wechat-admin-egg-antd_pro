import { Controller } from "egg";

export default class WxController extends Controller {
  async getWeixin() {
    let { ctx, service } = this;
    console.log(ctx.request);
    const { query } = ctx;
    const bool = service.wxToken.checkSignature(
      query.timestamp,
      query.nonce,
      query.signature
    );
    if (bool) {
      ctx.body = ctx.query.echostr;
    } else {
      ctx.body = "非法请求";
    }
  }
  async postWeixin() {
    let { ctx } = this;
    // console.log(ctx.request);
    console.log(ctx.request.body);
  }
}
