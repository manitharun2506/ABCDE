import mongoose from "mongoose";

const account = new mongoose.Schema({
  username: String,
  password: String,
  user_role: String,
  name: String,
  photo: String,
});
const Users = mongoose.model("user", account);
export default Users;
