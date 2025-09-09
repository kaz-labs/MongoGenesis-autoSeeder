import mongoose from "../../Customs/mongoose.c.js";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    buyer: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    orderedItems: [
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
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const orderModel = model("order", orderSchema);