// const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/questions");

router.get("/getQuestions", async (req, res) => {
  const data = await controller.getAllQuestions();

  //   res.send(JSON.stringify(data));
  console.log(data);
  res.send(data);
});

module.exports = router;
