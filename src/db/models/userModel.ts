// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email:{
//     type:String,
//     required: true,
//     unique:true,
//     index: true
//   },
//   password:{
//     type:String,
//   },
//   image:{
//     type:String,
//   }
// })

// export const User = mongoose.model("users",userSchema)

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required: true,
      unique:true,
      index: true
    },
    password:{
      type:String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
