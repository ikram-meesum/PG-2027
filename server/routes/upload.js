let express = require("express");
let route = express.Router();

let Student = require("../models/student.model");

route.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

route.post("/:id", async (req, res) => {
  let studentid = req.params.id;
  const updatedUser = await Student.findByIdAndUpdate(
    { _id: studentid }, // 1. Filter/ID
    { upload: "YES" }, // 2. Fields to update
    { new: true, runValidators: true }, // 3. Options (Return new doc & validate)
  );
  res.json({ msg: updatedUser });
});

module.exports = route;
