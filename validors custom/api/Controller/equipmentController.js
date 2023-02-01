import Equipments from "../Model/equipments.js";

export const addEquipment = async (req, res) => {
  try {
    const eq_data = req.body;
    const existingeq_name = await Equipments.findOne({
      eq_name: eq_data.eq_name,
    });
    const existing_Eq = await Equipments.findOne({ code: eq_data.code });
    if (
      Object.entries(eq_data).length === 0 ||
      eq_data.eq_name === "" ||
      eq_data.code === ""
    ) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (existing_Eq || existingeq_name) {
      res.status(400).send({ msg: "equipment already exists" });
    } else {
      const add_Eq = new Equipments(eq_data);
      await add_Eq.save();
      res.status(200).send({ msg: "equipment added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
export const getAllEqipments = async (req, res) => {
  try {
    const allEquipments = await Equipments.find();
    if (allEquipments) {
      res.status(200).send(allEquipments);
    } else {
      res.status(400).send({ msg: "no equipment data to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const removeEq = await Equipments.findByIdAndDelete(req.params.id);
    if (removeEq) {
      res.status(200).send({ msg: "equipment deleted successfully" });
    } else {
      res.status(400).send({ msg: "no equipment data found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const editEquipment = await Equipments.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (editEquipment) {
      res.status(200).send({ msg: "equipment updated successfully" });
    } else {
      res.status(400).send({ msg: "no equipment found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
