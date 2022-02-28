import TestsTable from "./TestsTable";

const TestManager = (props) => {
  return (
    <div>
      <div>Available Tests for {props.subject.SubjectName}</div>
      <TestsTable subject={props.subject}/>
      <button value="cancelTestManager" onClick={props.cancel}>
        Back
      </button>
      <button onClick={props.addTest}>
        Create a Test
      </button>
    </div>
  );
};

export default TestManager;
