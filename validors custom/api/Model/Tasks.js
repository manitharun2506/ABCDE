import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  date: String,
  starttime: String,
  location: String,
  shift: String,
  eq_name: String,
  eq_num: String,
  openingbalance: Number,
  assignedemp: String,
  customer: String,
  startreading: Number,
  endtime: String,
  endreading: { type: Number },
  taskid: { type: Number },
  totalhoursused: Number,
  closingBal: Number,
  remarks: String,
  eq_status: {
    type: String,
    default: "Active",
  },
  taskstatus: String,
  price: { type: Number, default: 0 },
  paymentstatus: { type: String, default: "Pending" },
  balanceamount: { type: Number, default: 0 },
});
const Tasks = mongoose.model("task", taskSchema);
export default Tasks;
