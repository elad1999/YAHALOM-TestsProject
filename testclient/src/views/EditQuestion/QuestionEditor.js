import { useEffect, useState } from "react";
import AnswerList from "../../Components/AnswerList";
import { Btn, Dropdown, Input, Line } from "../../GlobalComponents";
import Field from "../../GlobalComponents/Field";
import { saveQuestion } from "../../Services/questionService";
import "./QuestionEditor.css";
const QuestionEditor = (props) => {
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
    if (props.question) {
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
            field: field,
            type: list[type-1].value,
            text: text,
            lowerText: lowerText,
            answers: answers,
            layout: layout,
            tags: tags,
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
      if (answer.correct === true) return true;
    });
    return false;
  };
  const handleQuestion = (question) => {
    setField(question.field);
    setType("Single Choice Question"===question.type?"Single Choice Question":"Multiple Selection Question");
    setText(question.text);
    setLowerText(question.lowerText);
    setAnswers(question.answers);
    setLayout(question.layout);
    let tagsText = "";
    question.tags.forEach((element) => {
      tagsText += element;
    });
    setTags(tagsText);
  };
  const onAnswerAdd = () => {
    setAnswers((answers) => [...answers, { content: "", correct: false }]);
  };
  const onAnswerChanged=(index,event)=>{
    let tmpanswers=[...answers];
    tmpanswers[index].content=event.target.value;
    setAnswers(tmpanswers);
  }
  const onRemoveAnswer = (index,event) => {     
    setAnswers(answers.filter((x,i)=>i!==index));
  };
  const onSelectedChanged = (index) => {
    let tmpanswers = [...answers];
    if (type === 1) {
      tmpanswers.forEach((answer) => (answer.correct = false));
      tmpanswers[index].correct = true;
    } else tmpanswers[index].correct = !tmpanswers[index].correct;
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
          <Dropdown selected={(type)} list={list} onChange={handleType} />
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
