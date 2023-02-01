import { Router } from "express";
import * as refillcontroller from "../Controller/RefillController.js";

const refillRouter = Router();

refillRouter.post("/", refillcontroller.addRefill);
refillRouter.delete("/:id", refillcontroller.deleteRefill);
refillRouter.patch("/:id", refillcontroller.updateRefills);
refillRouter.post("/getbytaskid", refillcontroller.getRefillsByTaskId);

export default refillRouter;
