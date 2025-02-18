const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Blog = require("../models/Blog");

const createBlog = async (blog) => {
  try {
    const existedSlug = await Blog.findOne({
      slug: blog.slug,
    }).lean();
    if (existedSlug)
      return { status: false, message: "Slug has been existed!" };

    await Blog.create(blog);

    return { status: true, message: "Blog created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findOne({
      _id: id,
      isDelete: false,
    });

    if (!blog)
      return {
        status: false,
        message: "Blog does not exist or has already been deleted!",
      };

    blog.isDelete = true;
    await blog.save();

    return { status: true, message: "Blog has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getBlogById = async (id) => {
  try {
    const blog = await Blog.findOne({ _id: id, isDelete: false })
      .populate("author", "name")
      .lean();

    if (!blog) return { status: false, message: "Blog does not exist!" };

    return { status: true, message: "Get blog successfully!", data: blog };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getBlogBySlug = async (slug) => {
  try {
    const blog = await Blog.findOne({ slug: slug, isDelete: false })
      .populate("author", "name")
      .lean();

    if (!blog) return { status: false, message: "Blog does not exist!" };

    return { status: true, message: "Get blog successfully!", data: blog };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getBlogList = async (page, limit, filters) => {
  try {
    let blogList;
    if (page === 0 || limit === 0) {
      blogList = await Blog.find(filters).populate("author", "name").lean();
    } else {
      blogList = await Blog.find(filters)
        .populate("author", "name")
        .skip(page - 1 * limit)
        .limit(limit)
        .lean();
    }

    return {
      message: `Get blog list successfully!`,
      data: blogList,
      count: blogList.length,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateBlog = async (id, blog) => {
  try {
    const existedBlog = await Blog.findOne({
      _id: id,
      isDelete: false,
    });
    if (!existedBlog) return { status: false, message: "Blog doesn't exist!" };

    Object.assign(existedBlog, blog);
    const updatedBlog = await existedBlog.save();

    const populatedBlog = await Blog.findOne({ _id: updatedBlog._id })
      .populate("author", "name")
      .lean();

    return {
      status: true,
      message: "Blog updated successfully",
      data: populatedBlog,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
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
