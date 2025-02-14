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
  adminUpdateSchema,
} = require("../validators/schemas/admin.schema");
const { idSchema } = require("../validators/schemas/id.schema");
const { paginationSchema } = require("../validators/schemas/pagination.schema");
const adminController = require("../controllers/admin.controller");

router
  .route("/change-password/:id")
  .post(
    paramsValidate(idSchema),
    dataValidate(changePasswordSchema),
    adminController.changePassword
  );

router
  .route("/create")
  .post(dataValidate(adminCreateSchema), adminController.createAdmin);

router
  .route("/delete/:id")
  .delete(paramsValidate(idSchema), adminController.deleteAdmin);

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(adminFiltersSchema),
    adminController.getAdminList
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(adminUpdateSchema),
    adminController.updateAdmin
  );

router
  .route("/:id")
  .get(paramsValidate(idSchema), adminController.getAdminById);

module.exports = router;
