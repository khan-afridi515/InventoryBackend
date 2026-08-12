import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true },
    productId: { type: String, trim: true, sparse: true },
    sku: { type: String, trim: true, unique: true, sparse: true },
    quantity: { type: Number, required: true, min: 0 },
    minimumQuantity: { type: Number, required: true, min: 0, default: 0 },
    supplierCost: { type: Number, required: true, min: 0 },
    image : {type : String, required: true},
    Category: {type : String, required: true, trim: true},
    sellingPrice : {type : Number},
    supplierName : {type : String},
    description : {type : String, trim: true},
    userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);