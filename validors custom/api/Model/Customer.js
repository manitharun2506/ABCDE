import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  cust_name: String,
  ph_no: Number,
  alt_ph_no:Number,
  city: String,
  address: String,
  photo: String,
  openingAmount:Number,
  openingDate: String,
});
const Customers = mongoose.model("customer", customerSchema);
export default Customers;
