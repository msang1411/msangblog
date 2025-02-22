const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../validators/validator");
const {
  changePasswordSchema,
  adminCreateSchema,
  adminFiltersSchema,
  resetPassword,
  signInSchema,
  adminUpdateSchema,
} = require("../validators/schemas/admin.schema");
const { idSchema } = require("../validators/schemas/id.schema");
const { paginationSchema } = require("../validators/schemas/pagination.schema");
const adminController = require("../controllers/admin.controller");
const { verifyAccessToken } = require("../authentication/authentication.js");
const { authorize } = require("../middlewares/authorization.js");

router
  .route("/change-password/:id")
  .post(
    verifyAccessToken,
    authorize(("ADMIN_CHANGE_PASS", "change pass")),
    paramsValidate(idSchema),
    dataValidate(changePasswordSchema),
    adminController.changePassword
  );

router
  .route("/verify-access-token")
  .get(adminController.checkAccessTokenExpired);

router
  .route("/create")
  .post(
    verifyAccessToken,
    authorize(("ADMIN_CREATE", "create")),
    dataValidate(adminCreateSchema),
    adminController.createAdmin
  );

router
  .route("/delete/:id")
  .delete(
    verifyAccessToken,
    authorize(("ADMIN_DELETE", "delete")),
    paramsValidate(idSchema),
    adminController.deleteAdmin
  );

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(adminFiltersSchema),
    adminController.getAdminList
  );

router.route("/logout").get(adminController.logout);

router.route("/refresh-token").get(adminController.refreshToken);

router
  .route("/reset-password")
  .post(
    verifyAccessToken,
    authorize(("ADMIN_RESET_PASSWORD", "reset password")),
    dataValidate(resetPassword),
    adminController.resetPassword
  );

router
  .route("/signin")
  .post(dataValidate(signInSchema), adminController.signIn);

router
  .route("/update/:id")
  .put(
    verifyAccessToken,
    authorize(("ADMIN_UPDATE", "update")),
    paramsValidate(idSchema),
    dataValidate(adminUpdateSchema),
    adminController.updateAdmin
  );

router.route("/test").get(adminController.checkAccessTokenExpired);

router
  .route("/:id")
  .get(paramsValidate(idSchema), adminController.getAdminById);

module.exports = router;
