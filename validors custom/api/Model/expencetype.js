import mongoose from "mongoose";

const expencetypeSchema = new mongoose.Schema({
  date: String,
  expencetype: String,
  eq_name: String,
  emp_name: String,
  amount: Number,
  reciver: String,
  location: String,
  shift: String,
});
const ExpenceType = mongoose.model("expencetype", expencetypeSchema);
export default ExpenceType;
