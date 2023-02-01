import { Router } from "express";
import * as spareController from "../Controller/sparesController.js";

const spareRouter = Router();
spareRouter.post("/", spareController.addSpare);
spareRouter.get("/", spareController.getAllSpares);
spareRouter.delete("/:id", spareController.deleteSpare);
spareRouter.patch("/:id", spareController.updateSpare);
export default spareRouter;
