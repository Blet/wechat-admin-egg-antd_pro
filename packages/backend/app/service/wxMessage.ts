import { Service } from "egg";

export default class WxMessageService extends Service {
  async text() {
    console.log("text");
    let { ctx } = this;
    ctx.body = {
      MsgType: "text",
      Content: "hi,text"
    };
  }
  async image() {}
  async voice() {}
  async video() {}
  async shortvideo() {}
  async location() {}
  async link() {}
}
