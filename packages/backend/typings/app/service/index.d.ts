// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import WxEvent from '../../../app/service/wxEvent';
import WxMessage from '../../../app/service/wxMessage';
import WxToken from '../../../app/service/wxToken';

declare module 'egg' {
  interface IService {
    wxEvent: WxEvent;
    wxMessage: WxMessage;
    wxToken: WxToken;
  }
}
