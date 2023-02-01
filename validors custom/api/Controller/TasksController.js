import Tasks from "../Model/Tasks.js";
// import Refills from "../Model/Refill.js";

export const addTask = async (req, res) => {
  try {
    const genrateRandomNumber = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    console.log(genrateRandomNumber(1, 100000000));
    const task = req.body;
    let fakeStatus = {
      taskstatus: "Ongoing task",
    };
    const ongoingTask = await Tasks.findOne({
      taskid: task.taskid,
    });
    const eqIn_use = await Tasks.findOne({
      eq_name: task.eq_name,
      eq_num: task.eq_num,
      taskstatus: fakeStatus.taskstatus,
    });
    if (
      task.date == "" ||
      task.starttime == "" ||
      task.location == "" ||
      task.eq_name == "" ||
      task.eq_num == "" ||
      task.openingbalance == "" ||
      task.customer == "" ||
      task.startreading == ""
    ) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (ongoingTask) {
      res.status(400).send({ msg: "Task Id Already exists" });
    } else if (eqIn_use) {
      res.status(400).send({ msg: "equipment was in ongoing Status" });
    } else {
      const getTaskId = await Tasks.find();
      let addStatus = {
        taskstatus: "Ongoing task",
        taskid: genrateRandomNumber(1, 100000000),
      };
      Object.assign(task, addStatus);
      const assignTask = new Tasks(task);
      await assignTask.save();
      res.status(200).send({ msg: "new Task was Assigned" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const getTask = await Tasks.findById(taskId);
    if (getTask) {
      res.status(200).send(getTask);
    } else {
      res.status(400).send({ msg: "no task found on that id" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getOngoingTasks = async (req, res) => {
  try {
    let fakeStatus = {
      taskstatus: "Ongoing task",
    };
    const allTasks = await Tasks.find({ taskstatus: fakeStatus.taskstatus });
    if (allTasks) {
      res.status(200).send(allTasks);
    } else {
      res.status(400).send({ msg: "no current Ongoing Tasks to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
export const getCompletedTasks = async (req, res) => {
  try {
    let fakeStatus = {
      taskstatus: "Completed task",
    };
    const allTasks = await Tasks.find({ taskstatus: fakeStatus.taskstatus });
    if (allTasks) {
      res.status(200).send(allTasks);
    } else {
      res.status(400).send({ msg: "no completed  Tasks to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    let newData = req.body;
    let taskStatus = {
      taskstatus: "Completed task",
      balanceamount: newData.price,
    };
    Object.assign(newData, taskStatus);
    const editTask = await Tasks.findByIdAndUpdate(req.params.id, newData);
    if (editTask) {
      res.status(200).send({ msg: "task updated successfully" });
    } else {
      res.status(400).send({ msg: "no task found on that id to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const removeTask = await Tasks.findByIdAndDelete(req.params.id);
    if (removeTask) {
      res.status(200).send({ msg: "task deleted successfully" });
    } else {
      res.status(400).send({ msg: "no task found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
