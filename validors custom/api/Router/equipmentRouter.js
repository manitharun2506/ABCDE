import { Router } from "express";
import * as equipmentController from "../Controller/equipmentController.js";

const equipmentRouter = Router();
equipmentRouter.post("/", equipmentController.addEquipment);
equipmentRouter.get("/", equipmentController.getAllEqipments);
equipmentRouter.delete("/:id", equipmentController.deleteEquipment);
equipmentRouter.patch("/:id", equipmentController.updateEquipment);
export default equipmentRouter;
