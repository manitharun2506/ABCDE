import { Router } from "express";
import * as paymentsController from "../Controller/paymentsController.js";

const paymentsRouter = Router();
paymentsRouter.get(
  "/pendingpayments",
  paymentsController.getPaymentPendingTasks
);
paymentsRouter.patch("/task", paymentsController.updateTaskPaymentStatus);
paymentsRouter.get("/", paymentsController.getAllPayments);
paymentsRouter.delete("/:id", paymentsController.deletePayment);
paymentsRouter.patch("/:id", paymentsController.updatePayment);
paymentsRouter.post("/", paymentsController.addPayment);

export default paymentsRouter;
