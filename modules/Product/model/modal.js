import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, min: 0 },
    supplierCost: { type: Number, required: true, min: 0 },
    img : {type : String, required: true},
    Category: {type : String, required: true, trim: true},
    sellingPrice : {type : Number},
    supplierName : {type : String, trim: true},
    description : {type : String, trim: true},
    sku : {type : String, required: true, unique: true, trim: true}
}, { timestamps: true });

export default mongoose.model('Product', productSchema);