const express = require("express");
const users = require("../controllers/users");

//controllers

const usersRouter = express.Router();

// register
// http://localhost:5000/users/register
usersRouter.post("/register", users.register);

// login
// http://localhost:5000/users/login
usersRouter.post("/login", users.login);

usersRouter.get("/", users.getAllAdminAccounts);

usersRouter.put("/delete/:id", users.deleteAdminAccountById);

usersRouter.get("/", users.getAllAdminAccounts);

usersRouter.get("/users", users.getAllUsersAccounts);

usersRouter.put("/delete/:id", users.deleteAdminAccountById);

usersRouter.post("/message/:userId", users.sendMessage);

usersRouter.get("/message/:userId", users.getAllMessages);

usersRouter.get("/message/:userId/:adminId", users.getAllMessages);

usersRouter.get("/", users.getAllAdminAccounts);

usersRouter.put("/delete/:id", users.deleteAdminAccountById);

module.exports = usersRouter;
