const Joi = require("joi");

const roleCreateSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  createAt: Joi.date().default(Date.now),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const roleFiltersSchema = Joi.object().keys({
  name: Joi.string.optional(),
  isActive: Joi.boolean().optional(),
  isDelete: Joi.boolean().default(false),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const roleUpdateSchema = Joi.object().keys({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

module.exports = {
  roleCreateSchema,
  roleFiltersSchema,
  roleUpdateSchema,
};
