const statusCode = require("../utils/statusCode");
const blogService = require("../services/blog.service");

const createBlog = async (req, res, next) => {
  try {
    const result = await blogService.createBlog(req.value.data);

    if (!result.status)
      return res.status(statusCode.CONFLICT).json({
        message: result.message,
      });
    return res.status(statusCode.CREATED).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const result = await blogService.deleteBlog(req.value.params.id);
    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.ACCEPTED).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const result = await blogService.getBlogById(req.value.query.id);

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const result = await blogService.getBlogBySlug(req.value.params.slug);

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogList = async (req, res, next) => {
  try {
    const result = await blogService.getBlogList(
      req.value.query.page,
      req.value.query.limit,
      req.value.filters
    );

    return res.status(statusCode.OK).json({
      message: result.message,
      page: req.value.query.page,
      limit: req.value.query.limit,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const result = await blogService.updateBlog(
      req.value.params.id,
      req.value.data
    );

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });

    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogBySlug,
  getBlogList,
  updateBlog,
};
