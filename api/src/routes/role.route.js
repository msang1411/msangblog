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

router
  .route("/create")
  .post(dataValidate(roleCreateSchema), roleController.createRole);

router
  .route("/delete/:id")
  .delete(paramsValidate(idSchema), roleController.deleteRole);

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
    paramsValidate(idSchema),
    dataValidate(roleUpdateSchema),
    roleController.updateRole
  );

router.route("/:id").get(paramsValidate(idSchema), roleController.getRoleById);

module.exports = router;
