const db = require("../DAL/db.questionsRepo");

class QuestionsController {
  getAllQuestions() {
    return db.getAllQuestions();
  }
  manageQuestion(question) {
    if (question)
      if (question.id) db.editQuestion(question);
      else {question.id=new uuid
      }
  }
}

module.exports = new QuestionsController();
