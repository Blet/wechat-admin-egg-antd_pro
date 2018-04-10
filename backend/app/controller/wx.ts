import { Controller } from "egg";

export default class WxController extends Controller {
  async index() {
    let { ctx } = this;
    console.log(ctx.request);
    ctx.body = " hello,wx";
  }
}
