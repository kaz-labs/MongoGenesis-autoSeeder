//! Untested
import mongoose from "../../Customs/mongoose.c.js";

const { Schema, model } = mongoose;

const shopSchema = new Schema(
  {
    shopTitle: {
      alias: "title",
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    shopDescription: {
      alias: "short_description",
      required: true,
      type: String,
      maxlength: 500,
    },

    shopOwner: {
      alias: "owner_id",
      // resolve automatically from context
      type: Schema.ObjectId,
      ref: "user", //role must be admin/vendor
      required: true,
    },
  },
  { timestamps: true }
);

export const shopModel = model("shop", shopSchema);
