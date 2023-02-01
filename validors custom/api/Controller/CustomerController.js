import Customers from "../Model/Customer.js";

export const getCustomers = async (req, res) => {
  try {
    const allCustomers = await Customers.find();
    allCustomers.sort((a, b) => {
      let fa = a.cust_name.toLowerCase();
      let fb = b.cust_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    if (allCustomers) {
      res.status(200).send(allCustomers);
    } else {
      res.status(400).send({ msg: "No customer data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const cust_id = req.params.id;
    const removeCustomer = await Customers.findByIdAndDelete(cust_id);
    if (removeCustomer) {
      res.status(200).send({ msg: "Customer deleted successfully" });
    } else {
      res.status(400).send({ msg: "Customer id not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const cust_id = req.params.id;
    let newData = {
      ...req.body,
      photo: req.file.filename,
    };
    const edit_Cust = await Customers.findByIdAndUpdate(cust_id, newData);
    if (edit_Cust) {
      res.status(200).send({ msg: "Customer updated successfully" });
    } else {
      res.status(400).send({ msg: "No data found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const addCustomer = async (req, res) => {
  try {
    let cust_data = {
      ...req.body,
      photo: req.file.filename,
    };
    const existingphonenum = await Customers.findOne({
      ph_no: req.body.ph_no,
    });
    const existingaltphnum = await Customers.findOne({
      alt_ph_no: req.body.alt_ph_no,
    });
    if (req.body.ph_no === "" || req.body.alt_ph_no === "") {
      res.status(400).send({ msg: "Please enter valid details" });
    } else if (existingphonenum || existingaltphnum) {
      res.status(400).send({ msg: "Phone number or Alternate number already taken" });
    } else {
      const addCust = new Customers(cust_data);
      await addCust.save();
      res.status(200).send({ msg: "Successfully added customer" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
