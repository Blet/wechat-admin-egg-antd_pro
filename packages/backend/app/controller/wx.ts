import { Controller } from "egg";

export default class WxController extends Controller {
  async getWeixin() {
    let { ctx, service } = this;
    console.log(ctx);
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
    const { body } = ctx.request;
    const msgType = body.xml.MsgType;
    const event = body.xml.Event;
    console.log(event);
    if (msgType === "event") {
      this.eventMap[event]();
    } else {
      this.messageMap[msgType]();
    }
  }

  // 被动普通消息hash
  messageMap = {
    text: this.text,
    image: this.image,
    voice: this.voice,
    video: this.video,
    shortvideo: this.shortvideo,
    location: this.location,
    link: this.link
  };
  text() {}
  image() {}
  voice() {}
  video() {}
  shortvideo() {}
  location() {}
  link() {}

  // 被动消息事件Hash
  eventMap = {
    subscribe: this.subscribe,
    unsubscribe: this.unsubscribe,
    SCAN: this.SCAN,
    LOCATION: this.LOCATION,
    CLICK: this.CLICK,
    VIEW: this.VIEW
  };

  subscribe() {}
  unsubscribe() {}
  SCAN() {}
  LOCATION() {}
  CLICK() {}
  VIEW() {}
}
