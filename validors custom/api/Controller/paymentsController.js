import Payments from "../Model/payments.js";
import Tasks from "../Model/Tasks.js";

export const getPaymentPendingTasks = async (req, res) => {
  try {
    const obj = {
      paymentstatus: "Pending",
      taskstatus: "Completed task",
    };
    const tasksData = await Tasks.find({
      paymentstatus: obj.paymentstatus,
      taskstatus: obj.taskstatus,
    });
    if (tasksData) {
      res.status(200).send(tasksData);
    } else {
      res.status(400).send({ msg: "no pending payments to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const editPayment = await Payments.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (editPayment) {
      res.status(200).send({ msg: "payment updated successfully" });
    } else {
      res.status(400).send({ msg: "no payment found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const removePayment = await Payments.findByIdAndDelete(req.params.id);
    if (removePayment) {
      res.status(200).send({ msg: "payment Deleted successfully" });
    } else {
      res.status(400).send({ msg: "no payment Found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payments.find();
    if (allPayments) {
      res.status(200).send(allPayments);
    } else {
      res.status(400).send({ msg: "no payments data Found to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const addPayment = async (req, res) => {
  try {
    let paymentData = req.body;
    let guid = () => {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };

      return s4() + "-" + s4();
    };
    let obj = {
      paymentid: guid(),
    };
    Object.assign(paymentData, obj);
    const existingPayment = await Payments.findOne({
      taskid: paymentData.taskid,
      paymentid: paymentData.paymentid,
    });
    if (
      paymentData.taskid === "" ||
      paymentData.totalamount === "" ||
      paymentData.paidamount === "" ||
      paymentData.balanceamount === ""
    ) {
      res.status(400).send({ msg: "please enter valid Details" });
    } else if (existingPayment) {
      res.status(400).send({ msg: "payment already exists please try again" });
    } else {
      const addnewPayment = new Payments(paymentData);
      await addnewPayment.save();
      res.status(200).send({ msg: "payment Added Successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateTaskPaymentStatus = async (req, res) => {
  try {
    const editTask = await Tasks.findOneAndUpdate(
      { taskid: req.body.taskid },
      req.body
    );
    if (editTask) {
      res
        .status(200)
        .send({ msg: "payment Status Updated in tasks Successfulluy" });
    } else {
      res.status(400).send({ msg: "no task found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
