import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    title: {
      type: String,
      required: [true, "Chat title is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
