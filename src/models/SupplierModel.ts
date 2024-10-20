import mongoose, { Schema } from "mongoose";

const SupplierScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  product: String,
  category: {
    type: [String],
  },
  price: Number,
  contact: String,
  isTaking: {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  email: String,
  active: Number,
  photoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})


const SupplierModel = mongoose.model('suppliers', SupplierScheme)
export default SupplierModel