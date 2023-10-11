const express = require("express");
const roles = require("../controllers/roles");
const rolesRouter = express.Router();

//controllers
// create New Role
// http://localhost:5000/roles
rolesRouter.post("/", roles.createNewRole);

// create New permission
// http://localhost:5000/roles/permission
rolesRouter.post("/permission", roles.createNewPermission);

// create new role_permission
rolesRouter.post("/role_permission", roles.createNewRolePermission);

module.exports = rolesRouter;
