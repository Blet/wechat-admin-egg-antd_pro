// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import News from '../../../app/service/News';
import WxToken from '../../../app/service/WxToken';

declare module 'egg' {
  interface IService {
    news: News;
    wxToken: WxToken;
  }
}
