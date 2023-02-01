import express from "express";
import * as expenceController from "../Controller/expenceController.js";

const expRouter = express.Router();

expRouter.post("/", expenceController.addExpence);
expRouter.get("/", expenceController.getAllExp);
expRouter.delete("/:id", expenceController.deleteExp);
expRouter.put("/:id", expenceController.updateExp);
export default expRouter;
