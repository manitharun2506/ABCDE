import mongoose from "mongoose";

const LocationsSchema = new mongoose.Schema({
  country: String,
  state: String,
  city: String,
  area: String,
});

const LocationData = mongoose.model("userlocation", LocationsSchema);
export default LocationData;
