import { Router } from "express";
import * as mechController from "../Controller/mechineController.js";

const mechRouter = Router();
mechRouter.post("/", mechController.addMechine);
mechRouter.get("/", mechController.getAllmechines);
mechRouter.delete("/:id", mechController.deleteMech);
mechRouter.patch("/:id", mechController.updateMech);
export default mechRouter;
