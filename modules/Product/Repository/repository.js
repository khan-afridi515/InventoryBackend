import Product from "../model/modal.js";
import fileOnCloud from "../utills/cloud.js";

const addProductRepository = async (productData, file) => {
  try {
    let imgUrl = "";

    if (file) {
      let pic = await fileOnCloud(file.path);
      console.log("Check the pic of the file in the repository ", pic);

      imgUrl = pic.secure_url;
      productData.image = imgUrl;
    }

    console.log("imgUrl", imgUrl);
    const result = await Product.create(productData);
    return result;
  } catch (err) {
    throw err;
  }
};

const getProductsRepository = async (userId) => {
  try {
    const result = await Product.find(userId ? { userId } : {});
    return result;
  } catch (err) {
    throw err;
  }
};

const getProductByIdRepository = async (id, userId) => {
  try {
    const result = await Product.findOne({ _id: id, userId });
    return result;
  } catch (err) {
    throw err;
  }
};

const updateProductRepository = async (id, userId, updateData, file) => {
  try {
    if (file) {
      let pic = await fileOnCloud(file.path);
      updateData.img = pic.secure_url;
    }

    const result = await Product.findOneAndUpdate({ _id: id, userId }, updateData, {
      returnDocument: 'after',
      runValidators: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteProductRepository = async (id, userId) => {
  try {
    const result = await Product.findOneAndDelete({ _id: id, userId });
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteAllProductsRepository = async () => {
  try {
    const result = await Product.deleteMany({});
    return result;
  } catch (err) {
    throw err;
  }
};

export {
  addProductRepository,
  getProductsRepository,
  getProductByIdRepository,
  updateProductRepository,
  deleteProductRepository,
  deleteAllProductsRepository,
};
