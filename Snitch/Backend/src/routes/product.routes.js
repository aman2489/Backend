import { Router } from "express";
import { createProduct, getSellerProducts, getAllProducts } from "../controllers/product.cotroller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { validateProductCreation } from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 6 * 1024 * 1024 // 6MB
    }
});

const productRouter = Router();

productRouter.post("/", authenticateSeller, upload.array("images", 7), validateProductCreation, createProduct);

productRouter.get("/seller", authenticateSeller, getSellerProducts);

productRouter.get("/", getAllProducts);


export default productRouter;