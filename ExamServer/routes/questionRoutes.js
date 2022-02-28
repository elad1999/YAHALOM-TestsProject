const express = require("express");
const router = express.Router();
const controller = require("../controllers/questions");

router.post("/getQuestions", async (req, res) => {
  const data = await controller.getAllQuestions();
  res.status(200).send(data);
});


router.post('/ManageQuestion', async (req, res) => {  
  const data = await controller.manageQuestion(req.body);
  res.status(200).send(data)
})
module.exports = router;
