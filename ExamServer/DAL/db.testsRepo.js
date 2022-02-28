const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./data/jsonAsDb.json";
const testModel = require("../models/testModel");

class DbTestsRepo {
  async getAllSubjects() {
    const tmp = JSON.parse(await readFile(jsonFileName));
    let data;
    tmp.forEach((element) => {
      if (element.Subjects) {
        data = element;
      }
    });
    return data;
  }

  async getAllTests() {
    const tmp = JSON.parse(await readFile(jsonFileName));
    let data;
    tmp.forEach((element) => {
      if (element.Exams) {
        data = element;
      }
    });
    return data;
  }
  async getAllQuestions() {
    const tmp = JSON.parse(await readFile(jsonFileName));
    let data;
    tmp.forEach((element) => {
      if (element.Questions) {
        data = element;
      }
    });
    return data;
  }

  async addTest(test) {
    let data = JSON.parse(await readFile(jsonFileName));
    const bigggestId = Math.max.apply(
      Math,
      data[1].Exams.map((exam) => exam.ExamId)
    );

    testModel.ExamId = data[1].Exams.length < 1 ? 1 : bigggestId + 1;
    testModel.Title = test.name;
    testModel.SubjectId = test.subject.SubjectId;
    testModel.TestType = test.type;
    testModel.Language = test.language;
    testModel.PassingGrade = test.passingGrade;
    testModel.Header = test.header;
    testModel.ShowCorrectAnswersAfterSubmission = test.showCorrectAnswers;
    testModel.CertificateTemplates = test.certificateTemplates;
    testModel.IsActive = test.isActive;
    testModel.LastUpdate = new Date().toLocaleDateString();
    testModel.MsgOnSuccess = test.msgOnSuccess;
    testModel.MsgOnFailure = test.msgOnFailure;
    testModel.EmailDeliveryOnTestComplete.PassingTheTest.MessageSubject =
      test.emailDelivery.passingTheTest.msgSubject;
    testModel.EmailDeliveryOnTestComplete.PassingTheTest.MessageBody =
      test.emailDelivery.passingTheTest.msgBody;
    testModel.EmailDeliveryOnTestComplete.FaillingTheTest.MessageSubject =
      test.emailDelivery.fallingTheTest.msgSubject;
    testModel.EmailDeliveryOnTestComplete.FaillingTheTest.MessageBody =
      test.emailDelivery.fallingTheTest.msgBody;
    testModel.EmailDeliveryOnTestComplete.From = test.emailDelivery.from;
    testModel.EmailDeliveryOnTestComplete.CC = test.emailDelivery.cc;
    testModel.EmailDeliveryOnTestComplete.BCC = test.emailDelivery.bcc;
    testModel.EmailDeliveryOnTestComplete.Status = test.emailDelivery.status;
    //questions selected:
    testModel.Questions = test.Questions;

    data[1].Exams.push(testModel); //add test to tests table
    data[0].Subjects.map((sub) => {
      if (sub.SubjectId === testModel.SubjectId) {
        sub.SubjectExams.push(testModel.ExamId);
      }
    }); //add testId to subjectTests column in subjects table
    data[2].Questions.map((q) => {
      if(testModel.Questions.includes(q.QuestionId)){
        q.QuestionTests.push(testModel.ExamId);
      }
    });//add testId to questionTests column in questions table
    await writeFile(jsonFileName, JSON.stringify(data));
    return testModel;
  }
}

module.exports = new DbTestsRepo();
