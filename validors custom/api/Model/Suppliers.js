import mongoose from "mongoose";
const suplierSchema = new mongoose.Schema({
  supplier_name: String,
  phone_number: String,
  alternate_Ph_number: String,
  country: String,
  state: String,
  city: String,
  address: String,
  photo: String,
  opening_amount: Number,
  opening_date: String,
});
const Suppliers = mongoose.model("supplier", suplierSchema);
export default Suppliers;
