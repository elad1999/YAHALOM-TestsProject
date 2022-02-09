const db = require("../DAL/db.questionsRepo");

class QuestionsController {
  getAllQuestions() {
    return db.getAllQuestions();
  }
}

module.exports = new QuestionsController();
