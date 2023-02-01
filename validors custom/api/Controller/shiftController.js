import Shift from "../Model/shift.js";

export const addShift = async (req, res) => {
  try {
    const shift = req.body;
    const existingShift = await Shift.findOne({ shift: shift.shift });
    if (shift.shift === "" || Object.entries(shift).length === 0) {
      res.status(400).send({ msg: "Please enter valid details" });
    } else if (existingShift) {
      res.status(400).send({ msg: "Shift already exists" });
    } else {
      const addShif = new Shift(shift);
      await addShif.save();
      res.status(200).send({ msg: "Shift added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getShifts = async (req, res) => {
  try {
    const allShifts = await Shift.find();
    if (allShifts) {
      res.status(200).send(allShifts);
    } else {
      res.status(400).send({ msg: "No shift data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const removeShift = await Shift.findByIdAndDelete(req.params.id);
    if (removeShift) {
      res.status(200).send({ msg: "Shift deleted successfully" });
    } else {
      res.status(400).send({ msg: "No shift found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateShift = async (req, res) => {
  try {
    const editShift = await Shift.findByIdAndUpdate(req.params.id, req.body);
    if (editShift) {
      res.status(200).send({ msg: "Shift updated successfully" });
    } else {
      res.status(400).send({ msg: "No shift found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
