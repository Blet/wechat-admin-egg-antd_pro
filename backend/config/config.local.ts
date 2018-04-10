import { DefaultConfig } from "./config.default";

export default () => {
  const config: DefaultConfig = {};

  config.wxToken = "hello,wx";
  config.appID = "wx41ae0ccf49da47ae";
  config.appsecret = "b72420596bbbcec32d0e946d693d4a66";

  return config;
};
