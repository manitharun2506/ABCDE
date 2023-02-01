import express from "express";
import * as partnerController from "../Controller/PartnerController.js";
import multer from "multer";
const partnerRouter = express.Router();
// file uploading
const upload = multer({ dest: "./public/" });
partnerRouter.post("/", upload.single("photo"), partnerController.addPartner);
partnerRouter.get("/", partnerController.getAllPartners);
partnerRouter.delete("/:id", partnerController.deletePartner);
partnerRouter.put("/:id",upload.single("photo"), partnerController.updatePartner);
export default partnerRouter;
