import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { secret } from "./env.js";
import userRouter from "./Router/UserRouter.js";
import locationRouter from "./Router/locationRouter.js";
import supplierRouter from "./Router/suplierRouter.js";
import partnerRouter from "./Router/PartnerRouter.js";
import customerRouter from "./Router/CustomerRouter.js";
import expRouter from "./Router/expenceRouter.js";
import remarkRouter from "./Router/remarksRouter.js";
import categoryRouter from "./Router/catagoryRouter.js";
import designationRouter from "./Router/designationRouter.js";
import empStatusRouter from "./Router/employeeStatusRouter.js";
import shiftRouter from "./Router/shiftRoter.js";
import empRouter from "./Router/AddEmpRouter.js";
import equipmentRouter from "./Router/equipmentRouter.js";
import spareRouter from "./Router/sparesRouter.js";
import mechRouter from "./Router/mechineSetupRouter.js";
import refillRouter from "./Router/refillRouter.js";
import taskRouter from "./Router/TaskRouter.js";
import paymentsRouter from "./Router/paymentsRouter.js";
import expTypeRouter from "./Router/expencetypeRouter.js";
const app = express();
mongoose.set("strictQuery", true);
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
const port = secret.port;
const database_url = secret.database_Url;

mongoose.connect(database_url, (err) => {
  if (err) {
    console.log("error connecting to database");
  } else {
    app.listen(port, () => {
      console.log("server running  properly");
    });
  }
});
app.use("/api/v1/rentalEquipments/exptype", expTypeRouter);
app.use("/api/v1/rentalEquipments/payments", paymentsRouter);
app.use("/api/v1/rentalEquipments/tasks", taskRouter);
app.use("/api/v1/rentalEquipments/refills", refillRouter);
app.use("/api/v1/rentalEquipments/mechsetup", mechRouter);
app.use("/api/v1/rentalEquipments/spareparts", spareRouter);
app.use("/api/v1/rentalEquipments/equipments", equipmentRouter);
app.use("/api/v1/rentalEquipments/employees", empRouter);
app.use("/api/v1/rentalEquipments/empstatus", empStatusRouter);
app.use("/api/v1/rentalEquipments/shifts", shiftRouter);
app.use("/api/v1/rentalEquipments/designations", designationRouter);
app.use("/api/v1/rentalEquipments/categories", categoryRouter);
app.use("/api/v1/rentalEquipments/remarks", remarkRouter);
app.use("/api/v1/rentalEquipments/expences", expRouter);
app.use("/api/v1/rentalEquipments/customers", customerRouter);
app.use("/api/v1/rentalEquipments/partners", partnerRouter);
app.use("/api/v1/rentalEquipments/suppliers", supplierRouter);
app.use("/api/v1/rentalEquipments/location", locationRouter);
app.use("/api/v1/rentalEquipments/users", userRouter);
