import mongoose from "mongoose";

const spareSchema = new mongoose.Schema({
  date: String,
  category: String,
  sparename: String,
  code: String,
  expirydate: String,
  purchaseprice: Number,
  purchasedate: String,
  supplier: String,
  status: String,
  country: String,
  state: String,
  city: String,
  area: String,
});
const SpareParts = mongoose.model("sparepart", spareSchema);
export default SpareParts;
