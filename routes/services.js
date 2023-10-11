const express = require("express");

//controllers
const {
    createNewService,
    getAllServices,
    updateServiceById,
    deleteServiceById,
} = require("../controllers/services");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");


const servicesRouter = express.Router();

// services router endpoints
// http://localhost:5000/services
servicesRouter.post("", authentication, authorization("CREATE_SERVICE"),createNewService);
servicesRouter.get("", getAllServices);
servicesRouter.put("/:id", authentication, authorization("CREATE_SERVICE"),updateServiceById);
servicesRouter.delete("/:id", authentication, authorization("CREATE_SERVICE"),deleteServiceById);

module.exports = servicesRouter;