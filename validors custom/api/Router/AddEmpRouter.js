import { Router } from "express";
import * as EmpController from "../Controller/AddEmpController.js";
import multer from "multer";

const empRouter = Router();

const upload = multer({ dest: "./public/" });

empRouter.post("/", upload.single("photo"), EmpController.addEmp);
empRouter.get("/", EmpController.getAllEmp);
empRouter.delete("/:id", EmpController.deleteEmp);
empRouter.put("/:id",upload.single("photo"), EmpController.updateEmp);
export default empRouter;
