import {
  addProductService,
  getProductsService,
  getProductByIdService,
  getDummyDataService,
  updateProductService,
  deleteProductService,
  deleteAllProductsService
} from "../Service/service.js";

const Addproduct = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication is required"
      });
    }

    const { sku, ...payloadWithoutSku } = req.body || {};
    const productPayload = {
      ...payloadWithoutSku,
      userId,
    };

    const result = await addProductService(productPayload, req.file);
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
    const userId = req.user?.id || req.user?._id;
    const result = await getProductsService(userId);
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
    const userId = req.user?.id || req.user?._id;
    const result = await getProductByIdService(id, userId);
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch product"
    });
  }
};

const GetDummyData = async (req, res) => {
  try {
    const result = await getDummyDataService();
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch dummy data"
    });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id;
    const result = await updateProductService(id, userId, req.body, req.file);
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
    const userId = req.user?.id || req.user?._id;
    const result = await deleteProductService(id, userId);
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

export { Addproduct, GetProducts, GetProductById, GetDummyData, UpdateProduct, DeleteProduct, DeleteAllProducts };
