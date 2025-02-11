const { model, Schema, Types } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    permissions: [
      {
        type: Types.ObjectId,
        ref: "permission",
      },
    ],
  },
  {
    collection: "role",
  }
);

RoleSchema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete)
      this.deleteAt = new Date();
    else this.updateAt = new Date();
  }
  next();
});

const Role = model("role", RoleSchema);
module.exports = Role;
