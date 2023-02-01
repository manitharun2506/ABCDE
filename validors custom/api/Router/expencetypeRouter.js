import Router from "express";
import * as expTypeController from "../Controller/expencetypeController.js";

const expTypeRouter = Router();
expTypeRouter.post("/", expTypeController.addExpenceType);
expTypeRouter.get("/", expTypeController.getAllExpTypes);
expTypeRouter.delete("/:id", expTypeController.deleteExpType);
expTypeRouter.patch("/:id", expTypeController.updateExpType);

export default expTypeRouter;
