import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/productController";
import { validate } from "../middlewares/validation";
import { productSchema } from "../validations/productSchema";

const router = Router();
router.post("/create-product", validate(productSchema), createProduct);
router.get("/", getAllProducts);

export default router;
