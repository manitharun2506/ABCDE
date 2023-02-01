import express from "express";
import * as supplierController from "../Controller/supplierController.js";
import multer from "multer";

const supplierRouter = express.Router();
// file uploading
const upload = multer({ dest: "./public/" });
supplierRouter.post(
  "/",
  upload.single("photo"),
  supplierController.addSupplier
);
supplierRouter.get("/", supplierController.getAllSuppliers);
supplierRouter.delete("/:id", supplierController.deleteSupplier);
supplierRouter.put(
  "/:id",
  upload.single("photo"),
  supplierController.updateSupplier
);
supplierRouter.patch("/edit/:id", supplierController.editSupplier);
export default supplierRouter;
