import Router from "koa-router";
import ProdRouter from "./products.js";

const router = new Router({
  prefix: "/api",
});

router.use(ProdRouter);

router.get("/", (ctx) => {
  console.log(ctx);
});

export default router.routes();
