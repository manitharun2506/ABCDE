import mongoose from "mongoose";

const locations = new mongoose.Schema({
  country: String,
  states: Array,
});
const Locations = mongoose.model("globaldata", locations);
export default Locations;