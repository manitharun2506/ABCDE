import mongoose from "mongoose";
import { object } from "webidl-conversions";

const empSchema = new mongoose.Schema({
  emp_name: String,
  emp_id: String,
  designation: String,
  ph_no: Number,
  alt_ph_no: Number,
  address: String,
  gov_id: String,
  photo: String,
  emp_status: String,
  joiningdate: String,
  salary: Number,
  accounttitle: String,
  bankname: String,
  bnk_branch_name: String,
  bnk_acc_no: { type: Number, default: 0 },
  ifsccode: String,
  leave_type: String,
  no_of_leaves: Number,
  taxname: String,
  taxpercentage: Number,
});
const AddEmployee = mongoose.model("addemploye", empSchema);
export default AddEmployee;

// taxes: {
//   type: Array,
//   items: {
//     type: "object",
//     properties: {
//       taxname: String,
//       percentage: Number,
//     },
//   },
//   default: [{ taxname: "swachbarat", percentage: 10 }],
// },
