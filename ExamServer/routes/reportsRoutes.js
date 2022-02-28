module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/questions");

router.get("/getReportByTest", async (req, res) => {
  const data = await controller.getAllQuestions();
  console.log(data);
  res.send(data);
});


router.post('/getReportBystudent', async (req, res) => {
    const data = await controller.addTest(req.body);
    res.status(200).send(data);
})

module.exports = router;
