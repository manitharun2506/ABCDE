import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  date: String,
  eq_name: String,
  code: String,
  manufacturer: String,
  purchaseprice: Number,
  warentydate: String,
  owernership: String,
  partner: String,
  country: String,
  state: String,
  city: String,
  area: String,
  status: String,
});
const Equipments = mongoose.model("equipment", equipmentSchema);
export default Equipments;
