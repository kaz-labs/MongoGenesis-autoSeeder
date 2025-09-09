import mongoose from "../../Customs/mongoose.c.js";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    reviewTitle: {
      type: String,
      required: true,
      alias: "title",
      maxlength: 200,
    },
    reviewDetails: {
      type: String,
      // required: true,
      maxlength: 2000,
      alias: "short_description",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
      alias: "day_of_week",
    },
    reviewedBy: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    reviewTarget: {
      type: Schema.ObjectId,
      required: true,
      refPath: "targetType",
    },
    targetType: {
      type: String,
      enum: ["product", "order", "shop"],
      required: true,
    },
  },
  { timestamps: true }
);

export const reviewModel = model("review", reviewSchema);
