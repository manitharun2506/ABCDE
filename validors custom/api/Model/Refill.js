import mongoose from "mongoose";
const refillSchema = new mongoose.Schema({
  taskid: Number,
  refillnum: Number,
  openingbalance: {
    type: Number,
    default: 80,
  },
  closingbalance: {
    type: Number,
    default: 0,
  },
  startreading: Number,
  endreading: Number,
});
const Refills = mongoose.model("refill", refillSchema);
export default Refills;
