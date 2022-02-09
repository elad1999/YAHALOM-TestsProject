const express = require("express");
const router = express.Router();
const controller = require("../controllers/tests");

router.get("/getTests", async (req, res) => {
  const data = await controller.getAllTests();
  console.log(data);
  res.send(data);
});

router.get("/getTestsBySubject", async (req, res) => {
  const data = await controller.getTestsBySubject(req.params.subjectId);
  console.log(data);
  res.send(data);
});

router.post('/addTest', async (req, res) => {
    const data = await controller.addTest(req.body);
    res.status(200).send(data);
})

module.exports = router;
