const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    tgusername: {
      alias: "username",
      type: String,
      required: true,
      unique: true,
    },
    displayname: {
      alias: "fullname",
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "customer",
      required: true,
    },
    // optional fields
    email: {
      type: String,
      unique: false,
    },
    phone: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

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

const productModel = model("product", productSchema);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const cartModel = model("cart", cartSchema);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const orderModel = model("order", orderSchema);

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const reviewModel = model("review", reviewSchema);

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const shopModel = model("shop", shopSchema);

module.exports = {
    userModel,
    userSchema,
    productModel,
    productSchema,
    cartModel,
    orderModel,
    reviewModel,
    shopModel
}