import { Router } from "express";
import * as shiftController from "../Controller/shiftController.js";
const shiftRouter = Router();
shiftRouter.post("/", shiftController.addShift);
shiftRouter.get("/", shiftController.getShifts);
shiftRouter.delete("/:id", shiftController.deleteShift);
shiftRouter.put("/:id", shiftController.updateShift);
export default shiftRouter;
