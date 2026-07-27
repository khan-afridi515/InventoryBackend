import {
  addProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
  deleteAllProductsService
} from "../Service/service.js";

const Addproduct = async (req, res) => {
  try {
    const result = await addProductService(req.body, req.file);
    return res.status(result.status).json(result);
  } catch (error) {
    console.log("We are in the add product ", error.message);
    
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to add product"
    });
  }
};

const GetProducts = async (req, res) => {
  try {
    const result = await getProductsService();
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch products"
    });
  }
};

const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProductByIdService(id);
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch product"
    });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body, req.file);
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to update product"
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to delete product"
    });
  }
};

const DeleteAllProducts = async (req, res) => {
  try {
    const result = await deleteAllProductsService();
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to delete all products"
    });
  }
};

export { Addproduct, GetProducts, GetProductById, UpdateProduct, DeleteProduct, DeleteAllProducts };
