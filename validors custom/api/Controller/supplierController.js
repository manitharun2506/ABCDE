import Suppliers from "../Model/Suppliers.js";

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliersData = await Suppliers.find();
    suppliersData.sort((a, b) => {
      let fa = a.supplier_name.toLowerCase();
      let fb = b.supplier_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    if (suppliersData) {
      res.status(200).send(suppliersData);
    } else {
      res.status(400).send({ msg: " no supplier data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const removeSupplier = await Suppliers.findByIdAndDelete(supplierId);
    if (removeSupplier) {
      res.status(200).send({ msg: "Supplier Deleted Successfully" });
    } else {
      res.status(400).send({ msg: "No Supplier Found To Delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    let newData = {
      ...req.body,
      photo: req.file.filename,
    };
    const supplierId = req.params.id;

    const updateSuplier = await Suppliers.findByIdAndUpdate(
      supplierId,
      newData
    );
    if (updateSuplier) {
      res.status(200).send({ msg: "Supplier Data Updated Successfully" });
    } else {
      res.status(400).send({ msg: "No Supplier Found To Update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const editSupplier = async (req, res) => {
  try {
    const editSup = await Suppliers.findByIdAndUpdate(req.params.id, req.body);
    if (editSup) {
      res.status(200).send({ msg: "Supplier Edited Successfully" });
    } else {
      res.status(400).send({ msg: "Supplier Not Found to Update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const addSupplier = async (req, res) => {
  try {
    let supplierData = {
      ...req.body,
      photo: req.file.filename,
    };

    const existingphonenumber = await Suppliers.findOne({
      phone_number: supplierData.phone_number,
    });
    // const existingAlternateNum = await Suppliers.findOne({
    //   alternate_Ph_number: supplierData.alternate_Ph_number,
    // });
    if (
      supplierData.phone_number === "" ||
      supplierData.supplier_name === "" ||
      Object.entries(supplierData).length === 0
    ) {
      res.status(400).send({ msg: "Please Enter Valid Data" });
    } else if (existingphonenumber) {
      res.status(400).send({ msg: "Phonenumber Already Taken" });
    } else {
      const saveInfo = new Suppliers(supplierData);
      await saveInfo.save();
      res.status(200).send({ msg: "Supplier Added Successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
