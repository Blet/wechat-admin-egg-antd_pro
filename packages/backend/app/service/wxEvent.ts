import { Service } from "egg";

export default class WxMessageService extends Service {
  async subscribe() {
    console.log("subscribe");
    return {
      MsgType: "text",
      Content: "hi,subscribe"
    };
  }
  async unsubscribe() {}
  async SCAN() {}
  async LOCATION() {}
  async CLICK() {}
  async VIEW() {}
}
