import mongoose from "mongoose";

const empStatusSchema = new mongoose.Schema({
  employeestatus: String,
});
const EmpStatus = mongoose.model("empstatu", empStatusSchema);
export default EmpStatus;
