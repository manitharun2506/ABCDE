import express from "express";
import * as designationController from "../Controller/designationController.js";

const designationRouter = express.Router();
designationRouter.post("/", designationController.addDesignation);
designationRouter.get("/", designationController.getAllDesig);
designationRouter.delete("/:id", designationController.deleteDesignation);
designationRouter.put("/:id", designationController.updateDesig);
export default designationRouter;
