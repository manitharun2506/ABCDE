import Designations from "../Model/designation.js";

export const addDesignation = async (req, res) => {
  try {
    const desiData = req.body;
    const existingDesi = await Designations.findOne({
      designation: desiData.designation,
    });
    if (desiData.designation === "" || Object.entries(desiData).length === 0) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (existingDesi) {
      res.status(400).send({ msg: "designation already exists" });
    } else {
      const addDesg = new Designations(desiData);
      await addDesg.save();
      res.status(200).send({ msg: "designation added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllDesig = async (req, res) => {
  try {
    const allDesig = await Designations.find();
    if (allDesig) {
      res.status(200).send(allDesig);
    } else {
      res.status(400).send({ msg: "no designations to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteDesignation = async (req, res) => {
  try {
    const desiId = req.params.id;
    const removeDesi = await Designations.findByIdAndDelete(desiId);
    if (removeDesi) {
      res.status(200).send({ msg: "designation deleted succesfully" });
    } else {
      res.status(400).send({ msg: "no designation found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateDesig = async (req, res) => {
  try {
    const desigId = req.params.id;
    const newData = req.body;
    const editDesig = await Designations.findByIdAndUpdate(desigId, newData);
    if (editDesig) {
      res.status(200).send({ msg: "designation updated successfully" });
    } else {
      res.status(400).send({ msg: "no designation found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
