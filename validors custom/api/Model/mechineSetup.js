import mongoose from "mongoose";

const mechineSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  eq_name: String,
  eq_num: String,
  openingbalance: Number,
  hourlyrate: Number,
});
const MechineSetUp = mongoose.model("mechinesetup", mechineSchema);
export default MechineSetUp;
