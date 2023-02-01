import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  shift: String,
  date: String,
  customer: String,
  taskid: Number,
  collectedby_emp: String,
  paymentmode: String,
  paymentid: String,
  location: String,
  totalamount: Number,
  paidamount: Number,
  balanceamount: Number,
});
const Payments = mongoose.model("payment", paymentSchema);

export default Payments;
