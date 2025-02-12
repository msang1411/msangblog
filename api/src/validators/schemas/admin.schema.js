const Joi = require("joi");

const changePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().min(8).max(32).required(),
  newPassword: Joi.string().min(8).max(32).required(),
});

const adminCreateSchema = Joi.object().keys({
  username: Joi.string().min(8).max(32).required(),
  password: Joi.string().min(8).max(32).required(),
  name: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message(
      "Incorrect phone number format (have 8 - 15 number and '+' is first)"
    )
    .optional(),
  avatarURL: Joi.string().uri().optional(),
  birth: Joi.date().iso().less("now").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  isActive: Joi.boolean().default(false),
  createAt: Joi.date().default(Date.now),
  roles: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const adminFiltersSchema = Joi.object().keys({
  username: Joi.string().lowercase().email().optional(),
  name: Joi.string().trim().optional(),
  phone: Joi.string().optional(),
  gender: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  isDelete: Joi.boolean().default(false),
  roleId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  permissionId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});
// Use this when filter array
// roles: Joi.array()
//     .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
//     .optional(),
//   permissions: Joi.array()
//     .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
//     .optional(),

const adminUpdateSchema = Joi.object().keys({
  name: Joi.string().trim().optional(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message(
      "Incorrect phone number format (have 8 - 15 number and '+' is first)"
    )
    .optional(),
  avatarURL: Joi.string().uri().optional(),
  birth: Joi.date().iso().less("now").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  isActive: Joi.boolean().optional(),
  roles: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

module.exports = {
  changePasswordSchema,
  adminCreateSchema,
  adminFiltersSchema,
  adminUpdateSchema,
};
