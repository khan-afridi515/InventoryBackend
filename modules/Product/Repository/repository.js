import Product from '../model/modal.js';
import fileOnCloud from '../utills/cloud.js';


const addProductRepository = async (productData, file) => {
  try {
     let imgUrl = "";

        if (file) {
            let pic = await fileOnCloud(file.path);
            imgUrl = pic.secure_url;
            productData.img = imgUrl;
        }

        console.log("imgUrl", imgUrl);
    const result = await Product.create(productData);
    return result;
  } catch (err) {
    throw err;
  }
};

const getProductsRepository = async () => {
  try {
    const result = await Product.find({});
    return result;
  } catch (err) {
    throw err;
  }
};

const getProductByIdRepository = async (id) => {
  try {
    const result = await Product.findById(id);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateProductRepository = async (id, updateData, file) => {
  try {
    if (file) {
      let pic = await fileOnCloud(file.path);
      updateData.img = pic.secure_url;
    }

    const result = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteProductRepository = async (id) => {
  try {
    const result = await Product.findByIdAndDelete(id);
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
  deleteAllProductsRepository
};