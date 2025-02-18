const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../validators/validator");
const {
  blogCreateSchema,
  blogFiltersSchema,
  blogUpdateSchema,
  slugSchema,
} = require("../validators/schemas/blog.schema");
const { idSchema } = require("../validators/schemas/id.schema");
const { paginationSchema } = require("../validators/schemas/pagination.schema");
const blogController = require("../controllers/blog.controller");
const { verifyAccessToken } = require("../authentication/authentication.js");
const { authorize } = require("../middlewares/authorization.js");

router
  .route("/create")
  .post(
    verifyAccessToken,
    authorize(("BLOG_CREATE", "create")),
    dataValidate(blogCreateSchema),
    blogController.createBlog
  );

router
  .route("/delete/:id")
  .delete(
    verifyAccessToken,
    authorize(("BLOG_DELETE", "delete")),
    paramsValidate(idSchema),
    blogController.deleteBlog
  );

router.route("/get").get(queryValidate(idSchema), blogController.getBlogById);

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(blogFiltersSchema),
    blogController.getBlogList
  );

router
  .route("/update/:id")
  .put(
    verifyAccessToken,
    authorize(("BLOG_UPDATE", "update")),
    paramsValidate(idSchema),
    dataValidate(blogUpdateSchema),
    blogController.updateBlog
  );

router
  .route("/:slug")
  .get(paramsValidate(slugSchema), blogController.getBlogBySlug);

module.exports = router;
