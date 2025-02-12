const Joi = require("joi");

const createPermissionSchema = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string().required(),
  actions: Joi.array().min(1).required(),
  description: Joi.string().optional(),
  createAt: Joi.date().default(Date.now),
});

const permissionFiltersSchema = Joi.object().keys({
  name: Joi.string.optional(),
  code: Joi.string().optional(),
  isDelete: Joi.boolean().default(false),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const permissionUpdateSchema = Joi.object().keys({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

module.exports = {
  createPermissionSchema,
  permissionFiltersSchema,
  permissionUpdateSchema,
};
