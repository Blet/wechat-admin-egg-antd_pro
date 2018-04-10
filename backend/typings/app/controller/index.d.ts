// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import News from '../../../app/controller/news';
import Wx from '../../../app/controller/wx';

declare module 'egg' {
  interface IController {
    news: News;
    wx: Wx;
  }
}
