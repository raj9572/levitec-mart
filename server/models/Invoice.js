import mongoose from 'mongoose';
const { Schema } = mongoose;

const invoiceSchema = new Schema({
   products:[
        {
            name:String,
            price:String,
            quantity:Number,
            image:String,
            description:String
        }
    ],
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true});

const invoiceModel =  mongoose.model('Invoice', invoiceSchema);

export default invoiceModel