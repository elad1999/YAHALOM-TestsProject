const db = require("../DAL/db.questionsRepo");

class QuestionsController {
  getAllQuestions() {
    return db.getAllQuestions();
  }
  manageQuestion(question) {
    if (question)
      if (question.id) db.editQuestion(question);
      else {db.addQuestion(question)
      }
  }
}

module.exports = new QuestionsController();
