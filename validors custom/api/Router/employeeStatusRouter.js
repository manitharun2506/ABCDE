import { Router } from "express";
import * as empStatusController from "../Controller/empStatusController.js";
const empStatusRouter = Router();
empStatusRouter.post("/", empStatusController.addEmpStatus);
empStatusRouter.get("/", empStatusController.getAllStatus);
empStatusRouter.delete("/:id", empStatusController.deleteStatus);
empStatusRouter.put("/:id", empStatusController.updateStatus);

export default empStatusRouter;
