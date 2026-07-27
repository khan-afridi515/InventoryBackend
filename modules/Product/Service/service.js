import {
  addProductRepository,
  getProductsRepository,
  getProductByIdRepository,
  updateProductRepository,
  deleteProductRepository,
  deleteAllProductsRepository
} from "../Repository/repository.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dummyDataPath = path.join(__dirname, "..", "dummyData.json");

const addProductService = async (productData, file) => {
  try {
    const result = await addProductRepository(productData, file);

    if (!result) {
      return {
        status: 500,
        success: false,
        message: "Product was not created. Please try again."
      };
    }

    return {
      status: 201,
      success: true,
      data: result
    };
  } catch (err) {
    throw err;
  }
};

const getProductsService = async () => {
  try {
    const result = await getProductsRepository();

    if (!result || result.length === 0) {
      return {
        status: 404,
        success: false,
        message: "No products found"
      };
    }

    return {
      status: 200,
      success: true,
      data: result
    };
  } catch (err) {
    throw err;
  }
};

const getProductByIdService = async (id) => {
  try {
    if (!id) {
      return {
        status: 400,
        success: false,
        message: "Product id is required"
      };
    }

    const result = await getProductByIdRepository(id);

    if (!result) {
      return {
        status: 404,
        success: false,
        message: "Product not found"
      };
    }

    return {
      status: 200,
      success: true,
      data: result
    };
  } catch (err) {
    throw err;
  }
};

const updateProductService = async (id, updateData, file) => {
  try {
    if (!id) {
      return {
        status: 400,
        success: false,
        message: "Product id is required"
      };
    }

    const sanitizedData = Object.entries(updateData || {}).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(sanitizedData).length === 0 && !file) {
      return {
        status: 400,
        success: false,
        message: "No valid fields provided for update"
      };
    }

    const result = await updateProductRepository(id, sanitizedData, file);

    if (!result) {
      return {
        status: 404,
        success: false,
        message: "Product not found"
      };
    }

    return {
      status: 200,
      success: true,
      message: "Product updated successfully",
      data: result
    };
  } catch (err) {
    throw err;
  }
};

const deleteProductService = async (id) => {
  try {
    if (!id) {
      return {
        status: 400,
        success: false,
        message: "Product id is required"
      };
    }

    const result = await deleteProductRepository(id);

    if (!result) {
      return {
        status: 404,
        success: false,
        message: "Product not found or already deleted"
      };
    }

    return {
      status: 200,
      success: true,
      message: "Product deleted successfully",
      data: result
    };
  } catch (err) {
    throw err;
  }
};

const deleteAllProductsService = async () => {
  try {
    const result = await deleteAllProductsRepository();

    return {
      status: 200,
      success: true,
      message: `${result.deletedCount} product(s) deleted successfully`
    };
  } catch (err) {
    throw err;
  }
};

const getDummyDataService = async () => {
  try {
    const fileContents = await fs.readFile(dummyDataPath, "utf8");
    const dummyData = JSON.parse(fileContents);

    return {
      status: 200,
      success: true,
      data: dummyData
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: "Unable to load dummy data",
      error: err.message
    };
  }
};

export {
  addProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
  deleteAllProductsService,
  getDummyDataService
};


