import mongoose, { Schema } from "mongoose";

const SupplierScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  product: String,
  category: {
    type: [String],
  },
  price: Number,
  contact: String,
  isTalking: {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  photoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})


const SupplierModel = mongoose.model('suppliers', SupplierScheme)
export default SupplierModel