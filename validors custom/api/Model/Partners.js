import mongoose from "mongoose";
const partnerSchema = new mongoose.Schema({
  partner_name: String,
  phone_number: Number,
  alt_phone_num: Number,
  gov_id: String,
  country: String,
  state: String,
  city: String,
  address: String,
  photo: String,
  opening_amount: Number,
  opening_date: String,
  // contract details
  startdate: String,
  enddate: String,
  note: String,
});
const Partners = mongoose.model("partner", partnerSchema);
export default Partners;
