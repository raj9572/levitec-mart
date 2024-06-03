import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
   name:String,
   price:String,
   image:String,
   description:String
},{timestamps:true});

const productModel =  mongoose.model('Product', productSchema);

export default productModel