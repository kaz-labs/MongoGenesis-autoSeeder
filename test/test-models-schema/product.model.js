import mongoose from "../../Customs/mongoose.c.js";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      //! only for seeding and testing, change later!
      alias: "word",
      // unique: true,
      trim: true,
      minlength: 3,
    },
    productDescription: {
      type: String,
      alias: "short_description",
      maxlength: 500,
    },
    productPrice: {
      type: Number,
      alias: "integer",
      required: true,
      min: 0,
    },
    productLocation: {
      type: String,
      required: true,
      alias: "state",
      trim: true,
    },
    //todo convert category into a virtual
    productCategory: {
      type: Schema.ObjectId,
      ref: "category",
      alias: "letter",
      required: true,
    },
    //TODO resolve automatically from context
    seller: {
      type: Schema.ObjectId,
      ref: "shop",
      required: true,
    },
  },
  { timestamps: true }
);

export const productModel = model("product", productSchema);
