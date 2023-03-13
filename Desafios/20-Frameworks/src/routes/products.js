import Router from "koa-router";
import {
  getAll,
  save,
  getById,
  updateProd,
  removeProd,
} from "../controllers/products.js";

const router = new Router({
  prefix: "/products",
});

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", save);

router.put("/:id", updateProd);

router.delete("/:id", removeProd);

export default router.routes();
