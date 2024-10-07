const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { validateUser } = require("../middlewares/userValidate");

const router = express.Router();

//Create a new user
router.post("/add", createUser);

//Get all users
router.get("/getallusers", getUsers);

//Get a user by ID
router.get("/getuser/:id", getUserById);

//Update a user by ID
router.put("/update/:id", validateUser, updateUser);

//Delete a user by ID
router.delete("/deletuser/:id", deleteUser);

module.exports =  router ;
