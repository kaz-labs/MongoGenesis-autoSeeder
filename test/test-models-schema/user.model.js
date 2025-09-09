import mongoose from "../../Customs/mongoose.c.js";

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

export const userModel = model("user", userSchema);

