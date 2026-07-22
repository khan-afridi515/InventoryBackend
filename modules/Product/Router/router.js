import express from "express";
import {
  Addproduct,
  GetProducts,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
  DeleteAllProducts
} from "../controller/addProduct.js";
import upload from "../multer.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", upload.single("img"), Addproduct);
ProductRouter.get("/get", GetProducts);
ProductRouter.get("/get/:id", GetProductById);
ProductRouter.put("/update/:id", upload.single("img"), UpdateProduct);
ProductRouter.delete("/delete/:id", DeleteProduct);
ProductRouter.delete("/delete-all", DeleteAllProducts);

export { ProductRouter };