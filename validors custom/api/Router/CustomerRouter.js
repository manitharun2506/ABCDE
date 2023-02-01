import express from "express";
import * as customerController from "../Controller/CustomerController.js";
import multer from "multer";
const customerRouter = express.Router();

// file uploading
const upload = multer({ dest: "./public/" });

customerRouter.post("/",upload.single("photo"), customerController.addCustomer);
customerRouter.get("/", customerController.getCustomers);
customerRouter.delete("/:id", customerController.deleteCustomer);
customerRouter.put("/:id",upload.single("photo"), customerController.updateCustomer);
export default customerRouter;
