import { Router } from "express";
import { verify } from "jsonwebtoken";
import * as productCtrl from "../controllers/products.controller";
import { verifyToken } from "../middlewares/index";

const router = Router();

router.post("/", verifyToken, productCtrl.createProduct);

router.get("/", productCtrl.getProducts);

router.get("/:productId", productCtrl.getProductById);

router.put("/:productId", verifyToken, productCtrl.updateProductById);

router.delete("/:productId", verifyToken, productCtrl.deleteProductById);

export default router;
