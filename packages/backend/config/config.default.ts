"use strict";

import { EggAppConfig, PowerPartial } from "egg";

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
  news: {
    pageSize: number;
    serverUrl: string;
  };
  wxToken: string;
  appID: string;
  appsecret: string;
  middleware: Array<string>;
  xml: Object;
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  config.middleware = ["xml"];
  config.xml = {};
  // override config from framework / plugin
  config.keys = appInfo.name + "123456";

  config.security = {
    csrf: {
      enable: false
    }
  };

  return config;
};
