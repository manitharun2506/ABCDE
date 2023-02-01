import mongoose from "mongoose";

const expenceSchema = new mongoose.Schema({
  expencetype: String,
  effectequipment: {
    type: Boolean,
    default: false,
  },
});
const Expence = mongoose.model("expence", expenceSchema);
export default Expence;
