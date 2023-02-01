import { Router } from "express";
import * as taskController from "../Controller/TasksController.js";

const taskRouter = Router();

taskRouter.post("/", taskController.addTask);
taskRouter.get("/ongoing", taskController.getOngoingTasks);
taskRouter.delete("/:id", taskController.deleteTask);
taskRouter.patch("/:id", taskController.updateTask);
taskRouter.get("/completed", taskController.getCompletedTasks);
taskRouter.get("/:id", taskController.getTaskById);
export default taskRouter;
