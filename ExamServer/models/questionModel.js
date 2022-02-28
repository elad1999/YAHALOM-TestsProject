const QuestionModel = {
    Id: String,
    Field: String,
    Text: String,
    Layout: String,
    LowerText: String,
    Type: String,
    Tags: String,
    LastUpdate: Date,
    Answers: []
}

module.exports = QuestionModel;