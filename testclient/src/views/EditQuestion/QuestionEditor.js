import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnswerList from "../../Components/AnswerList";
import { Btn, Dropdown, Input, Line } from "../../GlobalComponents";
import Field from "../../GlobalComponents/Field";
import { saveQuestion } from "../../Services/questionService";
import "./QuestionEditor.css";
const QuestionEditor = (props) => {
  const location=useLocation();
  const [id, setId] = useState("");
  const [field, setField] = useState("");
  const [type, setType] = useState(1);
  const [text, setText] = useState("");
  const [lowerText, setLowerText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [layout, setLayout] = useState("");
  const [tags, setTags] = useState("");
  const list = [
    { id: 1, value: "Single Choice Question" },
    { id: 2, value: "Multiple Selection Question" },
  ];
  useEffect(() => {
    console.log(location)
    if (location)
      if (location.question) {
        handleQuestion(props.question);        
      }
  }, []);
  const handleType = (value) => {
    setType(value);
  };
  const handleText = (e) => setText(e.target.value);
  const handleLowerText = (e) => setLowerText(e.target.value);
  const handleLayout = (e) => setLayout(e.target.value);
  const handleTags = (e) => setTags(e.target.value);
  const onSave = () => {   
    if ((field, type, text, lowerText, answers, layout, tags)) {
      if (answers.length > 1) {
        if (checkIfCorrectExists)
          saveQuestion({
            Id: id,
            Field: field,
            Type: list[type - 1].value,
            Text: text,
            LowerText: lowerText,
            Answers: answers,
            Layout: layout,
            Tags: tags,
          });
      } else {
        window.alert("there must be more then one answer");
      }
    } else {
      window.alert("you must fill all fields");
    }
  };
  const checkIfCorrectExists = () => {
    answers.forEach((answer) => {
      if (answer.Correct === true) return true;
    });
    return false;
  };
  const handleQuestion = (question) => {
    setId(question.Id);
    setField(question.Field);
    setType(
      "Single Choice Question" === question.Type
        ? "Single Choice Question"
        : "Multiple Selection Question"
    );
    setText(question.Text);
    setLowerText(question.LowerText);
    setAnswers(question.Answers);
    setLayout(question.Layout);
    let tagsText = "";
    question.Tags.forEach((element) => {
      tagsText += element;
    });
    setTags(tagsText);
  };
  const onAnswerAdd = () => {
    setAnswers((answers) => [...answers, { Content: "", Correct: false }]);
  };
  const onAnswerChanged = (index, event) => {
    let tmpanswers = [...answers];
    tmpanswers[index].Content = event.target.value;
    setAnswers(tmpanswers);
  };
  const onRemoveAnswer = (index, event) => {
    setAnswers(answers.filter((x, i) => i !== index));
  };
  const onSelectedChanged = (index) => {
    let tmpanswers = [...answers];
    if (type === 1) {
      tmpanswers.forEach((answer) => (answer.Correct = false));
      tmpanswers[index].Correct = true;
    } else tmpanswers[index].Correct = !tmpanswers[index].Correct;
    setAnswers(tmpanswers);
  };
  return (
    <div>
      <h1>
        {props.question
          ? `Edit question #${props.question.id}`
          : `new question`}
      </h1>
      <div className="QuestionContainer">
        <Field>
          Field:{" "}
          <div>
            <b>{field}</b>
          </div>
          Question type:{" "}
          <Dropdown selected={type} list={list} onChange={handleType} />
          Question text: <Input value={text} onChange={handleText} />
          Text below question:
          <Input value={lowerText} onChange={handleLowerText} />
        </Field>
        <hr></hr>
        <Field>
          Possible answers:
          <AnswerList
            handleAddAnswer={onAnswerAdd}
            onAnswerChanged={onAnswerChanged}
            onSelectedChanged={onSelectedChanged}
            onRemoveAnswer={onRemoveAnswer}
            answers={answers}
            type={type}
          ></AnswerList>
          Answers layout:
          <Line>
            <Input
              type="radio"
              name="layout"
              value="vertical"
              onChange={handleLayout}
              checked={layout === "vertical"}
            />
            Vertical
            <Input
              type="radio"
              name="layout"
              value="Horizontal"
              onChange={handleLayout}
              checked={layout === "Horizontal"}
            />
            Horizontal
          </Line>
        </Field>
        <hr></hr>
        <Field>
          Tags:
          <Input value={tags} onChange={handleTags} />
          <div></div>
        </Field>
        <Line justify="around">
          <Btn>{"<<Back"}</Btn>
          <Line justify="end">
            <Btn>Show</Btn>
            <Btn onClick={onSave}>{"Save>>"}</Btn>
          </Line>
        </Line>
        <br />
      </div>
    </div>
  );
};
export default QuestionEditor;
