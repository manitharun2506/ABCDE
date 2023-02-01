import SpareParts from "../Model/spares.js";

export const addSpare = async (req, res) => {
  try {
    const spareData = req.body;
    const existingSpare=await SpareParts.findOne({code:spareData.code})
    if (Object.entries(spareData).length === 0) {
      res.status(400).send({ msg: "please enter valid detils" });
    } else if(existingSpare){
      res.status(400).send({ msg: "Spare Part code Already exists" });
    }
    else {
      const addSpare = new SpareParts(spareData);
      await addSpare.save();
      res.status(200).send({ msg: "sparePart added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllSpares = async (req, res) => {
  try {
    const allSpares = await SpareParts.find();
    if (allSpares) {
      res.status(200).send(allSpares);
    } else {
      res.status(400).send({ msg: "no spares data to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteSpare = async (req, res) => {
  try {
    const removeSpare = await SpareParts.findByIdAndDelete(req.params.id);
    if (removeSpare) {
      res.status(200).send({ msg: "sparepart deleted successfully" });
    } else {
      res.status(400).send({ msg: "no spare found to delete" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateSpare = async (req, res) => {
  try {
    const editSpare = await SpareParts.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (editSpare) {
      res.status(200).send({ msg: "sparePart updated successfully" });
    } else {
      res.status(400).send({ msg: "no spare found to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
