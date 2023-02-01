import ExpenceType from "../Model/expencetype.js";

export const addExpenceType = async (req, res) => {
  try {
    const expData = req.body;
    if (
      expData.date === "" ||
      expData.expencetype === "" ||
      expData.emp_name === "" ||
      expData.amount === "" ||
      expData.reciver === "" ||
      expData.location === "" ||
      expData.shift === "" ||
      Object.entries(expData).length === 0
    ) {
      res.status(400).send({ msg: "please enter valid details" });
    } else {
      const addExpType = new ExpenceType(expData);
      await addExpType.save();
      res.status(200).send({ msg: "Expence type Added Succefully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllExpTypes = async (req, res) => {
  try {
    const allExpTypes = await ExpenceType.find();
    if (allExpTypes) {
      res.status(200).send(allExpTypes);
    } else {
      res.status(400).send({ msg: "no data found to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteExpType = async (req, res) => {
  try {
    const removeExp = await ExpenceType.findByIdAndDelete(req.params.id);
    if (removeExp) {
      res.status(200).send({ msg: "expenceType Deleted successfully" });
    } else {
      res.status(400).send({ msg: "no expence found on that id to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateExpType = async (req, res) => {
  try {
    const editExp = await ExpenceType.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (editExp) {
      res.status(200).send({ msg: "expenceType updated successfully" });
    } else {
      res.status(400).send({ msg: "no expence found on that id to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
