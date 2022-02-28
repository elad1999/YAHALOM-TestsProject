const express = require("express");
const router = express.Router();
const controller = require("../controllers/questions");

router.get("/getQuestions", async (req, res) => {
  const data = await controller.getAllQuestions();
  res.send(data);
});


router.post('/ManageQuestion', async (req, res) => {  
  const data = await controller.manageQuestion();
  console.log(req.body);
})
module.exports = router;
