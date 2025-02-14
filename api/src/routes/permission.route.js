const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../validators/validator");
const {
  permissionCreateSchema,
  permissionFiltersSchema,
  permissionUpdateSchema,
} = require("../validators/schemas/permission.schema");
const { idSchema } = require("../validators/schemas/id.schema");
const { paginationSchema } = require("../validators/schemas/pagination.schema");
const permissionController = require("../controllers/permission.controller");

router
  .route("/create")
  .post(
    dataValidate(permissionCreateSchema),
    permissionController.createPermission
  );

router
  .route("/delete/:id")
  .delete(paramsValidate(idSchema), permissionController.deletePermission);

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(permissionFiltersSchema),
    permissionController.getPermissionList
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(permissionUpdateSchema),
    permissionController.updatePermission
  );

router
  .route("/:id")
  .get(paramsValidate(idSchema), permissionController.getPermissionById);

module.exports = router;
