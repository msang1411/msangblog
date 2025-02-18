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
const { verifyAccessToken } = require("../authentication/authentication.js");
const { authorize } = require("../middlewares/authorization.js");

router
  .route("/create")
  .post(
    verifyAccessToken,
    authorize(("PERMISSION_CREATE", "create")),
    dataValidate(permissionCreateSchema),
    permissionController.createPermission
  );

router
  .route("/delete/:id")
  .delete(
    verifyAccessToken,
    authorize(("PERMISSION_DELETE", "delete")),
    paramsValidate(idSchema),
    permissionController.deletePermission
  );

router
  .route("/get-list")
  .post(
    verifyAccessToken,
    authorize(("PERMISSION_GET_LIST", "get")),
    queryValidate(paginationSchema),
    filtersValidate(permissionFiltersSchema),
    permissionController.getPermissionList
  );

router
  .route("/update/:id")
  .put(
    verifyAccessToken,
    authorize(("PERMISSION_UPDATE", "update")),
    paramsValidate(idSchema),
    dataValidate(permissionUpdateSchema),
    permissionController.updatePermission
  );

router
  .route("/:id")
  .get(
    verifyAccessToken,
    authorize(("PERMISSION_GET_ID", "get")),
    paramsValidate(idSchema),
    permissionController.getPermissionById
  );

module.exports = router;
