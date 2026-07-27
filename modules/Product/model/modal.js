import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    supplierCost: { type: Number, required: true, min: 0 },
    image : {type : String, required: true},
    Category: {type : String, required: true, trim: true},
    sellingPrice : {type : Number},
    supplierName : {type : String},
    description : {type : String, trim: true},
    sku : {type : String, required: true, unique: true, trim: true}
}, { timestamps: true });

export default mongoose.model('Product', productSchema);