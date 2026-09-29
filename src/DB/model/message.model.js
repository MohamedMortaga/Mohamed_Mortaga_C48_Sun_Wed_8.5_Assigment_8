import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // a message must have text, attachments, or both
    content: {
      type: String,
      trim: true,
      minLength: [2, "content must be at least 2 characters"],
      maxLength: [10000, "content must be at most 10000 characters"],
      required: [
        function hasNoAttachments() {
          return !this.attachmentsPath?.length;
        },
        "content is required when there are no attachments",
      ],
    },
    attachmentsPath: {
      type: [String],
      default: [],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "receiverId is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

messageSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.id;
    return ret;
  },
});

const MessageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MessageModel;
