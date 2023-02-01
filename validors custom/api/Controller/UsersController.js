import Users from "../Model/Users.js";

export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await Users.findOne({ username: userData.username });
    if (
      userData.username === "" ||
      userData.password === "" ||
      userData.name === "" ||
      userData.user_role === "" ||
      Object.entries(userData).length === 0
    ) {
      res.status(400).send({ msg: "please enter valid details" });
    } else if (existingUser) {
      res.status(400).send({ msg: "username already exists" });
    } else {
      const register = new Users(userData);
      await register.save();
      res.status(200).send({ msg: "Account created successfully" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const userCredentials = req.body;
    const existingUsername = await Users.findOne({
      username: userCredentials.username,
    });
    const existingUser = await Users.findOne({
      username: userCredentials.username,
      password: userCredentials.password,
    });
    if (
      userCredentials.username === "" ||
      userCredentials.password === "" ||
      Object.entries(userCredentials).length === 0
    ) {
      res.status(400).send({ msg: "Please enter valid details" });
    } else if (existingUser) {
      res.status(200).send(existingUser._id);
    } else if (!existingUsername) {
      res.status(400).send({ msg: "Username not Found" });
    } else {
      res.status(400).send({ msg: "Username Password Mismatched" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send({ msg: "user not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    if (allUsers) {
      res.status(200).send(allUsers);
    } else {
      res.status(400).send({ msg: "no data found to show" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const editUser = await Users.findByIdAndUpdate(req.params.id, req.body);
    if (editUser) {
      res.status(200).send({ msg: "Account updated Successfully" });
    } else {
      res.status(200).send({ msg: "No Account Found on that Username" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const editUserImg = async (req, res) => {
  try {
    let newData = {
      ...req.body,
      photo: req.file.filename,
    };
    const userId = req.params.id;
    const edituser = await Users.findByIdAndUpdate(userId, newData);
    if (edituser) {
      res.status(200).send({ msg: "Account Updated Successfully" });
    } else {
      res.status(200).send({ msg: "Username not Found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
