import express from "express";
import * as categoryController from "../Controller/catagoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", categoryController.addCatgry);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.delete("/:id", categoryController.deleteCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
export default categoryRouter;
