"use strict";

import { EggAppConfig, PowerPartial } from "egg";
import * as fs from "fs";
import * as path from "path";

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
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${
    appInfo.name
  }`;

  // override config from framework / plugin
  config.keys = appInfo.name + "123456";

  config.siteFile = {
    "/favicon.ico": fs.readFileSync(
      path.join(appInfo.baseDir, "app/public/favicon.png")
    )
  };

  return config;
};
