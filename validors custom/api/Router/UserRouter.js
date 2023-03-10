import express from "express";
import * as userController from "../Controller/UsersController.js";
import multer from "multer";
const upload = multer({ dest: "./public/" });
const userRouter = express.Router();
userRouter.post("/login", userController.userLogin);
userRouter.post("/", userController.addUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUser);
userRouter.put("/:id", upload.single("photo"), userController.editUserImg);
export default userRouter;
