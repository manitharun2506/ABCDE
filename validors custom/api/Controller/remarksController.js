import Remarks from "../Model/remarks.js";

export const addRemark = async (req, res) => {
  try {
    const remark = req.body;
    const existingRemark = await Remarks.findOne({ remarks: remark.remarks });
    if (remark.remarks === "" || Object.entries(remark).length === 0) {
      res.status(400).send({ msg: "Please enter valid data" });
    } else if (existingRemark) {
      res.status(400).send({ msg: "Remark already exists" });
    } else {
      const addRemk = new Remarks(remark);
      await addRemk.save();
      res.status(200).send({ msg: "Remark added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllRemarks = async (req, res) => {
  try {
    const allData = await Remarks.find();
    if (allData) {
      res.status(200).send(allData);
    } else {
      res.status(400).send({ msg: "No data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteRemark = async (req, res) => {
  try {
    const remarkId = req.params.id;
    const removeRemk = await Remarks.findByIdAndDelete(remarkId);
    if (removeRemk) {
      res.status(200).send({ msg: "Remark deleted successfully" });
    } else {
      res.status(400).send({ msg: "No remark to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateRemark = async (req, res) => {
  try {
    const remkid = req.params.id;
    const newData = req.body;
    const editRemark = await Remarks.findByIdAndUpdate(remkid, newData);
    if (editRemark) {
      res.status(200).send({ msg: "Remark updated succesfullly" });
    } else {
      res.status(400).send({ msg: "No remark to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
