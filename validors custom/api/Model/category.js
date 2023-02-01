import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  category: String,
});
const Categories = mongoose.model("categorie", categorySchema);
export default Categories;
