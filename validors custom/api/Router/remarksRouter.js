import express from "express";
import * as remarkController from "../Controller/remarksController.js";

const remarkRouter = express.Router();

remarkRouter.post("/", remarkController.addRemark);
remarkRouter.get("/", remarkController.getAllRemarks);
remarkRouter.delete("/:id", remarkController.deleteRemark);
remarkRouter.put("/:id", remarkController.updateRemark);
export default remarkRouter;
