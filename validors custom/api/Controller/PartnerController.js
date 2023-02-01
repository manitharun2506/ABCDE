import Partners from "../Model/Partners.js";

export const addPartner = async (req, res) => {
  try {
    let partnerInfo = {
      ...req.body,
      photo: req.file.filename,
    };
    const existingPhoneNumber = await Partners.findOne({
      phone_number: partnerInfo.phone_number,
    });
    // const existingAlt_Phone_num = await Partners.findOne({
    //   alt_phone_num: partnerInfo.alt_phone_num,
    // });
    const existingGov_Id = await Partners.findOne({
      gov_id: partnerInfo.gov_id,
    });
    if (
      partnerInfo.partner_name === "" ||
      partnerInfo.phone_number === "" ||
      partnerInfo.gov_id === "" ||
      Object.entries(partnerInfo).length === 0
    ) {
      res.status(400).send({ msg: "Please enter valid details" });
    } else if (existingPhoneNumber) {
      res.status(400).send({ msg: "Phonenumber already taken" });
    } else if (existingGov_Id) {
      res.status(400).send({ msg: "Id proof Already taken" });
    } else {
      const add_Partner = new Partners(partnerInfo);
      await add_Partner.save();
      res.status(200).send({ msg: "Partner added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const allData = await Partners.find();
    allData.sort((a, b) => {
      let fa = a.partner_name.toLowerCase();
      let fb = b.partner_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    if (allData) {
      res.status(200).send(allData);
    } else {
      res.status(400).send({ msg: "No data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const id = req.params.id;
    const removePartner = await Partners.findByIdAndDelete(id);
    if (removePartner) {
      res.status(200).send({ msg: "Partner removed successfully" });
    } else {
      res.status(400).send({ msg: "Partner not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    let newData = {
      ...req.body,
      photo: req.file.filename,
    };
    const id = req.params.id;

    const editPartner = await Partners.findByIdAndUpdate(id, newData);
    if (editPartner) {
      res.status(200).send({ msg: "Partner updated successfully" });
    } else {
      res.status(400).send({ msg: "Partner not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
