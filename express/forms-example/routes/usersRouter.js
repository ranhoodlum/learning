const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.getUsersList);
usersRouter.get("/create", usersController.getCreateUser);
usersRouter.post("/create", usersController.postCreateUser);
usersRouter.get("/:id/update", usersController.getUpdateUser);
usersRouter.post("/:id/update", usersController.postUpdateUser);

module.exports = usersRouter;
