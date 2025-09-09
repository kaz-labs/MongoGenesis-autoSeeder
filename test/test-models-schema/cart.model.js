import mongoose from "../../Customs/mongoose.c.js";

const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    cartOwner: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          alias: "day_of_week",
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);
export const cartModel = model("cart", cartSchema);
