const Joi = require("joi");

const paginationSchema = Joi.object({
  limit: Joi.number().integer().min(0).default(0),
  page: Joi.number().integer().min(0).default(0),
});

module.exports = {
  paginationSchema,
};
