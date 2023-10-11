const express = require("express");
const {createNewAccessories,getAllAccessories,deleteAccessoryById,updateAccessoryById}=require("../controllers/accessories");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//controllers

const accessoriesRouter = express.Router();
accessoriesRouter.post("/",authentication,authorization("CREATE_ACCESSORY"),createNewAccessories)
accessoriesRouter.get("/",getAllAccessories)
accessoriesRouter.put("/:id",authentication,authorization("CREATE_ACCESSORY"), updateAccessoryById)
accessoriesRouter.delete("/:id",authentication,authorization("CREATE_ACCESSORY"),deleteAccessoryById)

module.exports = accessoriesRouter;
