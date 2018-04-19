// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import WxToken from '../../../app/service/WxToken';
import WxEvent from '../../../app/service/wxEvent';
import WxMessage from '../../../app/service/wxMessage';

declare module 'egg' {
  interface IService {
    wxToken: WxToken;
    wxEvent: WxEvent;
    wxMessage: WxMessage;
  }
}
