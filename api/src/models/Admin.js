const { model, Schema, Types } = require("mongoose");

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    birth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
    roles: [
      {
        type: Types.ObjectId,
        ref: "role",
      },
    ],
    permissions: [
      {
        type: Types.ObjectId,
        ref: "permission",
      },
    ],
  },
  {
    collection: "admin",
  }
);

AdminSchema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete)
      this.deleteAt = new Date();
    else this.updateAt = new Date();
  }
  next();
});

const Admin = model("admin", AdminSchema);
module.exports = Admin;
