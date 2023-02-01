import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  shift: String,
});

const Shift = mongoose.model("shift", shiftSchema);
export default Shift;
