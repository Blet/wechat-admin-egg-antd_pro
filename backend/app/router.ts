import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.redirect("/", "/wx");
  router.get("/wx", controller.wx.index);
  router.get("/news", controller.wx.index);
};
