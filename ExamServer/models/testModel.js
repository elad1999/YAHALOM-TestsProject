const Enum = require("enum");

const TestModel = {
  ExamId: Number,
  Title: String,
  SubjectId: Number,
  Questions: [Number],
  Language: String,
  TestType: new Enum({
    1: "Predefined",
    2: "Random",
  }),
  PassingGrade: Number,
  ShowCorrectAnswersAfterSubmission: Boolean,
  Header: String,
  MsgOnSuccess: String,
  MsgOnFailure: String,
  CertificateTemplates: new Enum({
    1: "No Certificate Template",
    2: "PDF file",
    3: "Url link",
  }),
  EmailDeliveryOnTestComplete: {
    Status: Boolean,
    From: String,
    CC: String,
    BCC: String,
    PassingTheTest: { MessageSubject: String, MessageBody: String },
    FaillingTheTest: { MessageSubject: String, MessageBody: String },
  },
  IsActive: Boolean,
  LastUpdate: Date,
};

module.exports = TestModel;
