const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../validators/validator");
const {
  roleCreateSchema,
  roleFiltersSchema,
  roleUpdateSchema,
} = require("../validators/schemas/role.schema");
const { idSchema } = require("../validators/schemas/id.schema");
const { paginationSchema } = require("../validators/schemas/pagination.schema");
const roleController = require("../controllers/role.controller");
const { verifyAccessToken } = require("../authentication/authentication.js");
const { authorize } = require("../middlewares/authorization.js");

router
  .route("/create")
  .post(
    verifyAccessToken,
    authorize(("ROLE_CREATE", "create")),
    dataValidate(roleCreateSchema),
    roleController.createRole
  );

router
  .route("/delete/:id")
  .delete(
    verifyAccessToken,
    authorize(("ROLE_DELETE", "delete")),
    paramsValidate(idSchema),
    roleController.deleteRole
  );

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(roleFiltersSchema),
    roleController.getRoleList
  );

router
  .route("/update/:id")
  .put(
    verifyAccessToken,
    authorize(("ROLE_UPDATE", "update")),
    paramsValidate(idSchema),
    dataValidate(roleUpdateSchema),
    roleController.updateRole
  );

router.route("/:id").get(paramsValidate(idSchema), roleController.getRoleById);

module.exports = router;
