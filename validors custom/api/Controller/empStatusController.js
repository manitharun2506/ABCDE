import EmpStatus from "../Model/employeeStatus.js";

export const addEmpStatus = async (req, res) => {
  try {
    const empStatus = req.body;
    const existingStatus = await EmpStatus.findOne({
      employeestatus: empStatus.employeestatus,
    });
    if (
      empStatus.employeestatus === "" ||
      Object.entries(empStatus).length === 0
    ) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (existingStatus) {
      res.status(400).send({ msg: "employee Status already exists" });
    } else {
      const addStatus = new EmpStatus(empStatus);
      await addStatus.save();
      res.status(200).send({ msg: "Employee Status Added Successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllStatus = async (req, res) => {
  try {
    const allStatus = await EmpStatus.find();
    if (allStatus) {
      res.status(200).send(allStatus);
    } else {
      res.status(400).send({ msg: "no data found" });
    }
  } catch (err) {}
};

export const deleteStatus = async (req, res) => {
  try {
    const statusId = req.params.id;
    const removeStatus = await EmpStatus.findByIdAndDelete(statusId);
    if (removeStatus) {
      res.status(200).send({ msg: "status removed successfully" });
    } else {
      res.status(400).send({ msg: "no status found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  const statusId = req.params.id;
  try {
    const newData = req.body;
    const editStatus = await EmpStatus.findByIdAndUpdate(statusId, newData);
    if (editStatus) {
      res.status(200).send({ msg: "status updated successfully" });
    } else {
      res.status(400).send({ msg: "no status found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
