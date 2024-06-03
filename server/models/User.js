import mongoose from 'mongoose';
import validator from 'validator'
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email")
      }
    }

  },
  password:{
    type:String,
    required:true
  }
},{timestamps:true});

const userModel =  mongoose.model('User', userSchema);

export default userModel