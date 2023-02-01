import Expence from "../Model/expence.js";

export const addExpence = async (req, res) => {
  try {
    const exp_data = req.body;
    const existingExp = await Expence.findOne({
      expencetype: exp_data.expencetype,
    });
    if (exp_data.expencetype === "" || Object.entries(exp_data).length === 0) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (existingExp) {
      res.status(400).send({ msg: "expence type already exists" });
    } else {
      const addExp = new Expence(exp_data);
      await addExp.save();
      res.status(200).send({ msg: "expence type successfully added" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllExp = async (req, res) => {
  try {
    const allExp = await Expence.find();
    if (allExp) {
      res.status(200).send(allExp);
    } else {
      res.status(400).send({ msg: "no expence data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteExp = async (req, res) => {
  try {
    const expId = req.params.id;
    const removeExp = await Expence.findByIdAndDelete(expId);
    if (removeExp) {
      res.status(200).send({ msg: "expence type deleted successfully" });
    } else {
      res.status(400).send({ msg: "no expencetype to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateExp = async (req, res) => {
  try {
    const expId = req.params.id;
    const newData = req.body;
    const editExp = await Expence.findByIdAndUpdate(expId, newData);
    if (editExp) {
      res.status(200).send({ msg: "expence type updated successfully" });
    } else {
      res.status(400).send({ msg: "no expence to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
