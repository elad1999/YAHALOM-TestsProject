import { Btn, Line } from "../GlobalComponents";
import Answer from "./Answer";

const AnswerList = (props) => {
  const handleAnswerChanged = (event,index) => {
    props.onAnswerChanged(event,index);
  };
  const handleSelectedChanged = (event,index) => {
    props.onSelectedChanged(event,index);
  };
  const handleRemove = (event,index) => {
    props.onRemoveAnswer(event,index);
  };
  const renderList = () => {
    if (props.answers) {
      return props.answers.map((item, index) => {
        return (
          <Answer
            {...item}
            type={props.type === 1 ? "radio" : "checkbox"}
            key={index}
            onChange={handleAnswerChanged.bind(this,index)}
            onSelect={handleSelectedChanged.bind(this,index)}
            onRemove={handleRemove.bind(this,index)}
          />
        );
      });
    }
  };

  return (
    <div>
      {renderList()}
      <Line justify="end">
        <Btn onClick={props.handleAddAnswer}>Add An Answer</Btn>
      </Line>
    </div>
  );
};

export default AnswerList;
