const Joi = require("joi");
const { BLOG_CATEGORY, BLOG_TAGS } = require("../../configs/index");

const blogCreateSchema = Joi.object().keys({
  title: Joi.string().required(),
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(3)
    .max(50)
    .messages({
      "string.pattern.base":
        "Slugs can only contain lowercase letters, numbers, and hyphens",
      "string.min": "must be at least 3 characters",
      "string.max": "Cannot be longer than 50 characters",
    }),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  content: Joi.string().required(),
  category: Joi.array()
    .items(Joi.string().valid(...BLOG_CATEGORY))
    .min(1)
    .required()
    .messages({
      "array.min": "Must have at least one category",
      "any.only": "Invalid category provided",
    }),
  tag: Joi.array()
    .items(Joi.string().valid(...BLOG_TAGS))
    .optional()
    .messages({
      "any.only": "Invalid category provided",
    }),
  isHidden: Joi.boolean().default(false),
  createAt: Joi.date().default(Date.now),
});

const blogFiltersSchema = Joi.object().keys({
  title: Joi.string().optional(),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  category: Joi.string()
    .valid(...BLOG_CATEGORY)
    .messages({
      "any.only": "Invalid category provided",
    })
    .optional(),
  tag: Joi.string()
    .valid(...BLOG_TAGS)
    .messages({
      "any.only": "Invalid category provided",
    })
    .optional(),
  isHidden: Joi.boolean().optional(),
  isDelete: Joi.boolean().default(false),
});

const blogUpdateSchema = Joi.object().keys({
  title: Joi.string().optional(),
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(3)
    .max(50)
    .messages({
      "string.pattern.base":
        "Slugs can only contain lowercase letters, numbers, and hyphens",
      "string.min": "must be at least 3 characters",
      "string.max": "Cannot be longer than 50 characters",
    })
    .optional(),
  content: Joi.string().optional(),
  category: Joi.array()
    .items(Joi.string().valid(...BLOG_CATEGORY))
    .min(1)
    .optional()
    .messages({
      "array.min": "Must have at least one category",
      "any.only": "Invalid category provided",
    }),
  tag: Joi.array()
    .items(Joi.string().valid(...BLOG_TAGS))
    .optional()
    .messages({
      "any.only": "Invalid category provided",
    }),
  isHidden: Joi.boolean().optional(),
});

const slugSchema = Joi.object().keys({
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(3)
    .max(50)
    .messages({
      "string.pattern.base":
        "Slugs can only contain lowercase letters, numbers, and hyphens",
      "string.min": "must be at least 3 characters",
      "string.max": "Cannot be longer than 50 characters",
    })
    .required(),
});

module.exports = {
  blogCreateSchema,
  blogFiltersSchema,
  blogUpdateSchema,
  slugSchema,
};
