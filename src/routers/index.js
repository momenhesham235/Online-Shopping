import userRouter from "./router/user.router.js";

const mainRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
};
export default mainRoutes;
