import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;
  router.get("/wx", controller.wx.getWeixin);
  router.post("/wx", controller.wx.postWeixin);
};
