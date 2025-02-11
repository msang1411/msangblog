const { model, Schema } = require("mongoose");

const PermissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    actions: {
      type: [
        {
          action: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      ],
      required: true,
      _id: false,
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
  },
  {
    collection: "permission",
  }
);

PermissionSchema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete)
      this.deleteAt = new Date();
    else this.updateAt = new Date();
  }
  next();
});

const Permission = model("permission", PermissionSchema);
module.exports = Permission;
