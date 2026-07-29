import express from "express";
import {
  Addproduct,
  GetProducts,
  GetProductById,
  GetDummyData,
  UpdateProduct,
  DeleteProduct,
  DeleteAllProducts
} from "../controller/addProduct.js";
import { generateReportController } from "../controller/genrateReport.controller.js";
import upload from "../multer.js";
import { authorizeAccessToken } from "../../../shared/authorizeAccessToken.js";

const ProductRouter = express.Router();

/**
 * Wraps multer middleware so that multer errors (e.g. "Field name missing"
 * when no file is sent in a multipart/form-data update request) are caught
 * and swallowed gracefully. The request still continues — req.file will
 * simply be undefined when no file was provided.
 */
const optionalUpload = (req, res, next) => {
  upload.single("img")(req, res, (err) => {
    if (err) {
      // Ignore multer errors (missing field, wrong field name, etc.)
      // and continue without a file — req.file will be undefined.
      req.file = undefined;
      return next();
    }
    next();
  });
};

ProductRouter.post("/add", authorizeAccessToken, upload.single("image"), Addproduct);
ProductRouter.get("/get", authorizeAccessToken, GetProducts);
ProductRouter.get("/get/:id", authorizeAccessToken, GetProductById);
ProductRouter.get("/dummy", GetDummyData);
ProductRouter.put("/update/:id", authorizeAccessToken, optionalUpload, UpdateProduct);
ProductRouter.delete("/delete/:id", authorizeAccessToken, DeleteProduct);
ProductRouter.delete("/delete-all", authorizeAccessToken, DeleteAllProducts);

//Generate report endpoints
ProductRouter.get('/Report-data', generateReportController);
export { ProductRouter };
