import MechineSetUp from "../Model/mechineSetup.js";

export const addMechine = async (req, res) => {
  try {
    const mech_data = req.body;
    const existingMech = await MechineSetUp.findOne({
      eq_num: mech_data.eq_num,
    });
    if (
      mech_data.eq_name === "" ||
      mech_data.eq_num === "" ||
      mech_data.openingbalance === "" ||
      Object.entries(mech_data).length === 0
    ) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (existingMech) {
      res.status(400).send({ msg: "equipment setup already exists ,please update it " });
    } else {
      const addEquip = new MechineSetUp(mech_data);
      await addEquip.save();
      res.status(200).send({ msg: "mechin setup done" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllmechines = async (req, res) => {
  try {
    const allMeach = await MechineSetUp.find();
    if (allMeach) {
      res.status(200).send(allMeach);
    } else {
      res.status(400).send({ msg: "no data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteMech = async (req, res) => {
  try {
    const removeMech = await MechineSetUp.findByIdAndDelete(req.params.id);
    if (removeMech) {
      res.status(200).send({ msg: "equipment removed successfully" });
    } else {
      res.status(400).send({ msg: "no equipment found to remove" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateMech = async (req, res) => {
  try {
    const editMech = await MechineSetUp.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (editMech) {
      res.status(200).send({ msg: "mechine updated successfully" });
    } else {
      res.status(400).send({ msg: "no mechine found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
