import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      default: null,
    },
    coverImage: {
      type: String,
      require: true,
    },
    author: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        require: true,
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
