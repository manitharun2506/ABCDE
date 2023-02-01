import Categories from "../Model/category.js";

export const addCatgry = async (req, res) => {
  try {
    const catgryData = req.body;
    const existingCatgry = await Categories.findOne({
      category: catgryData.category,
    });
    if (catgryData.category === "" || Object.entries(catgryData).length === 0) {
      res.status(400).send({ msg: "please enter valid data" });
    } else if (existingCatgry) {
      res.status(400).send({ msg: "category already exists" });
    } else {
      const addCatgy = new Categories(catgryData);
      await addCatgy.save();
      res.status(200).send({ msg: "category added successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allData = await Categories.find();
    if (allData) {
      res.status(200).send(allData);
    } else {
      res.status(400).send({ msg: "no category data found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const catgyId = req.params.id;
    const removeCatgy = await Categories.findByIdAndDelete(catgyId);
    if (removeCatgy) {
      res.status(200).send({ msg: "category deleted successfuly" });
    } else {
      res.status(400).send({ msg: "no category to delete" });
    }
  } catch (err) {}
};

export const updateCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    const newData = req.body;
    const editCatgy = await Categories.findByIdAndUpdate(catId, newData);
    if (editCatgy) {
      res.status(200).send({ msg: "category updatted successfully" });
    } else {
      res.status(400).send({ msg: "no category to update" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
