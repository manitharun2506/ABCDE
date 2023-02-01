import Refills from "../Model/Refill.js";

export const addRefill = async (req, res) => {
  try {
    const newRefill = req.body;
    const existingRefillnumber = await Refills.findOne({
      taskid: newRefill.taskid,
      refillnum: newRefill.refillnum,
    });
    if (
      newRefill.taskid === "" ||
      newRefill.refillnum === "" ||
      newRefill.startreading === "" ||
      newRefill.endreading === "" ||
      Object.entries(newRefill).length === 0
    ) {
      res.status(400).send({ msg: "All inputs should be filled properly" });
    } else if (existingRefillnumber) {
      res.status(400).send({
        msg: "refill number for that taskID already exists,Please change refill",
      });
    } else {
      const addnewRefill = new Refills(newRefill);
      await addnewRefill.save();
      res.status(200).send({ msg: "new refill Added for current task" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getRefillsByTaskId = async (req, res) => {
  try {
    const taskId = req.body;
    const refills = await Refills.find({ taskid: taskId.taskid });
    if (refills) {
      res.status(200).send(refills);
    } else {
      res.status(400).send({ msg: "no data found on that taskid" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateRefills = async (req, res) => {
  try {
    const editRefill = await Refills.findByIdAndUpdate(req.params.id, req.body);
    if (editRefill) {
      res.status(200).send({ msg: "refill updated successfully" });
    } else {
      res.status(400).send({ msg: "no Refill found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteRefill = async (req, res) => {
  try {
    const removeRefill = await Refills.findByIdAndDelete(req.params.id);
    if (removeRefill) {
      res.status(200).send({ msg: "Refill deleted successfully" });
    } else {
      res.status(400).send({ msg: "no refill found on that Id to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
