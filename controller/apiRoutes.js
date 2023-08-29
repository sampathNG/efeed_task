const api = exports;
const users = require("../db/userModel");
const books = require("../db/booksModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
api.start = async (req, res) => {
  try {
    console.log("Hello, world!");
    res.send("Hello, world!");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
// USERS
api.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new users({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    const savedUser = await user.save();
    console.log("user created successfully");
    res.send("user created successfully");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, "secretKey", {
      expiresIn: "72h",
    });
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.getAllUsers = async (req, res) => {
  try {
    const x = await users.find();
    console.log(x);
    res.send(x);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.deleteAllUsers = async (req, res) => {
  try {
    await users.deleteMany();
    console.log("users deleted");
    res.send("users deleted");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
// BOOKS
api.createBook = async (req, res) => {
  try {
    const book = new books({
      _id: req.body._id,
      name: req.body.name,
      author: req.body.author,
      year: req.body.year,
      rating: req.body.rating,
    });
    const savedUser = await book.save();
    console.log("book created successfully");
    res.send("book created successfully");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.getAllBooks = async (req, res) => {
  try {
    const x = await books.find();
    console.log(x);
    res.send(x);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.getOneBook = async (req, res) => {
  try {
    const x = await books.findById({ _id: req.params.id });
    console.log(x);
    res.send(x);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.deleteOneBook = async (req, res) => {
  try {
    await books.findByIdAndDelete({ _id: req.params.id });
    console.log("Book deleted");
    res.send("book deleted");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.updateOneBook = async (req, res) => {
  try {
    const update = await books.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!update) {
      console.log("book not found");
      res.send("book not found");
    }
    console.log("book updated");
    res.send("book updated");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
