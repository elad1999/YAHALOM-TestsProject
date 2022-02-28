import TestsForm from "./NewTestForm";

const NewTest = (props) => {

  const onEditingTestStateChange = () => {
    props.cancel();
  }

  return (
    <div>
      <div>New Test</div>
      <TestsForm
        Subject={props.subject}
        TestModel={props.testModel}
        State={props.inEditingTest}
        OnInEdiitngStateChange={onEditingTestStateChange}
      />
      <button onClick={props.cancel}>
        Back
      </button>
    </div>
  );
};

export default NewTest;
