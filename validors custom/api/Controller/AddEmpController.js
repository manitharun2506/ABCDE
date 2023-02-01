import AddEmployee from "../Model/AddEmployee.js";

export const addEmp = async (req, res) => {
  try {
    let empData = {
      ...req.body,
      photo: req.file.filename,
    };

    const existingEmpName = await AddEmployee.findOne({
      emp_name: req.body.emp_name,
    });
    const existingEmpId = await AddEmployee.findOne({
      emp_id: req.body.emp_id,
    });
    const existingPhNo = await AddEmployee.findOne({ ph_no: req.body.ph_no });
    const existingAlt_ph_no = await AddEmployee.findOne({
      alt_ph_no: req.body.alt_ph_no,
    });
    const existingGov_id = await AddEmployee.findOne({
      gov_id: req.body.gov_id,
    });
    const existingBnkAccNo = await AddEmployee.findOne({
      bnk_acc_no: req.body.bnk_acc_no,
    });
    if (
      empData.emp_name === "" ||
      empData.emp_id === "" ||
      empData.ph_no === "" ||
      empData.gov_id === "" ||
      Object.entries(empData).length === 0
    ) {
      res.status(400).send({ msg: "Please enter valid details" });
    } else if (existingEmpName) {
      res.status(400).send({ msg: "Employee name already taken" });
    } else if (existingEmpId) {
      res.status(400).send({ msg: "Employee Id already exists" });
    } else if (existingAlt_ph_no || existingPhNo) {
      res.status(400).send({
        msg: "PhoneNumber or alternate phone number is taken already",
      });
    } else if (existingGov_id) {
      res.status(400).send({ msg: "Social security number already taken" });
    } else if (existingBnkAccNo) {
      res.status(400).send({ msg: "Bank account number already exists" });
    } else {
      const addEmployee = new AddEmployee(empData);
      await addEmployee.save();
      res.status(200).send({ msg: "Employee added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllEmp = async (req, res) => {
  try {
    const allEmp = await AddEmployee.find();
    if (allEmp) {
      res.status(200).send(allEmp);
    } else {
      res.status(400).send({ msg: "No data found to display" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateEmp = async (req, res) => {
  try {
    const emp_id = req.params.id;
    let newData = {
      ...req.body,
      photo: req.file.filename,
    };

    const editEmp = await AddEmployee.findByIdAndUpdate(emp_id, newData);
    if (editEmp) {
      res.status(200).send({ msg: "Employee updated successfully" });
    } else {
      res.status(400).send({ msg: "No employee found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteEmp = async (req, res) => {
  try {
    const removeEmp = await AddEmployee.findByIdAndDelete(req.params.id);
    if (removeEmp) {
      res.status(200).send({ msg: "Employee deleted successfully" });
    } else {
      res.status(400).send({ msg: "No employee found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
