import { Application } from "egg";
import * as WechatAPI from "co-wechat-api";

export default function(app: Application) {
  app.beforeStart(async () => {
    app.wxApi = new WechatAPI(app.config.appID, app.config.appsecret);
  });
}

declare module "egg" {
  interface Application {
    wxApi: {
      /**
       * 上传Logo
       * @param filepath 文件路径
       */
      uploadLogo(filepath: string);
      // card
      /**
       * @name addLocations
       * @param {Array} locations 位置
       */
      addLocations(locations);

      getLocations(offset,count);

      getColors();

    };
  }
}
