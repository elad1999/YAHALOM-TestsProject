const fs = require("fs");
const util = require("util");
const QuestionModel = require("../models/questionModel");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const Questions = "./data/questions.json";
const { v4: uuidv4, v4 } = require("uuid");

class DbQuestionsRepo {
  async getAllQuestions() {
    const data = JSON.parse(await readFile(Questions));
    return data;
  }
  async addQuestion(question) {
    let data = JSON.parse(await readFile(Questions));
    QuestionModel.Id = uuidv4();
    QuestionModel.Field = question.field;
    QuestionModel.Layout = question.layout;
    QuestionModel.Text = question.text;
    QuestionModel.LowerText = question.lowerText;
    QuestionModel.Type = question.type;
    QuestionModel.Answers = question.answers;
    QuestionModel.LastUpdate=new Date();
    data.push(QuestionModel);
    await writeFile(Questions, JSON.stringify(data));
    console.log(data)
  }
  async editQuestion(question) {
    let data = JSON.parse(await readFile(Questions));
    data.forEach((element) => {
      if ((element.Id = question.Id)) {
        element.Layout = question.layout;
        element.Text = question.text;
        element.LowerText = question.lowerText;
        element.Type = question.type;
        element.Answers = question.answers;
        element.LastUpdate=new Date();
      }
    });    
    await writeFile(Questions, JSON.stringify(data));
    console.log(data)
  }
}

module.exports = new DbQuestionsRepo();
