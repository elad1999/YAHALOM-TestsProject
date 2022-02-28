const express = require("express");
const router = express.Router();
const controller = require("../controllers/tests");
const TestModel = require('../models/testModel');

router.get("/getTests", async (req, res) => {
  const data = await controller.getAllTests();
  // console.log(data);
  res.send(data);
});

router.get("/getQuestions", async (req, res) => {
  const data = await controller.getAllQuestions();
  // console.log(data);
  res.send(data);
});

router.get("/getSubjects", async (req, res) => {
  const data = await controller.getSubjects();
  // console.log(data);
  res.send(data);
});

// router.get("/getTestsBySubject", async (req, res) => {
//   console.log(req.params);
//   const data = await controller.getTestsBySubject(req.params.subjectId);
//   res.send(data);
// });

router.get("/getTestModel", (req, res) => {
  const data = TestModel;
  res.send(data);
})

router.post('/addTest', async (req, res) => {
    const data = await controller.addTest(req.body);
    // console.log(data);
    res.status(200).send(data);
})

module.exports = router;
