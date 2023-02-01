import Locations from "../Model/Locations.js";
import LocationData from "../Model/UserLocations.js";

export const getLocations = async (req, res) => {
  try {
    const data = await Locations.find();
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ msg: "Data not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const addLocation = async (req, res) => {
  try {
    const locationData = req.body;
    const existingData = await LocationData.findOne({
      country: locationData.country,
      state: locationData.state,
      city: locationData.city,
      area: locationData.area,
    });
    if (
      locationData.country === "" ||
      locationData.area === "" ||
      Object.entries(locationData).length === 0
    ) {
      res.status(400).send({ msg: "Please enter valid details" });
    } else if (existingData) {
      res.status(400).send({ msg: "Data already exists" });
    } else {
      const addLoc = LocationData(locationData);
      await addLoc.save();
      res.status(200).send({ msg: "Location added succesfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const removeData = await LocationData.findByIdAndDelete(id);
    if (removeData) {
      res.status(200).send({ msg: "Data deleted successfully" });
    } else {
      res.status(400).send({ msg: "Data not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updateData = await LocationData.findByIdAndUpdate(id, newData);
    if (updateData) {
      res.status(200).send({ msg: "Data updated succesfully" });
    } else {
      res.status(400).send({ msg: "Data not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllLocationsData = async (req, res) => {
  try {
    const allData = await LocationData.find();
    allData.sort((a, b) => {
      let fa = a.country.toLowerCase();
      let fb = b.country.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    if (allData) {
      res.status(200).send(allData);
    } else {
      res.status(400).send({ msg: "No data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
