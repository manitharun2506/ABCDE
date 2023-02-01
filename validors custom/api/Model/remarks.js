import mongoose from "mongoose";

const remarksSchema = new mongoose.Schema({
  remarks: String,
});
const Remarks = mongoose.model("remark", remarksSchema);
export default Remarks;
