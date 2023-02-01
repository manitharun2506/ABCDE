import mongoose from "mongoose";
const designationSchema = new mongoose.Schema({
  designation: String,
});
const Designations = mongoose.model("designation", designationSchema);
export default Designations;
