const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getUsers);
userRouter.get("/new", userController.getUserForm);
userRouter.post("/new", userController.postUser);
userRouter.get("/delete", userController.getDeleteUser);

module.exports = userRouter;
