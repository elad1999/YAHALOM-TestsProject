import { useState } from "react";
import TestService from "../../services/testService.ts";
import EmailDelivery from "./EmailDelivery";
import GeneralInfo from "./NewTestGeneralInfo";
import QuestionSelector from "./QuestionSelector";
// import {Form, Button} from 'semantic-ui-react';

const TestsForm = (props) => {
  const TestModel = props.TestModel;
  //Genereal info:
  const [enteredLang, setEnteredLang] = useState("English");
  const [enteredType, setEnteredType] = useState(TestModel.TestType[1]);
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassingGrade, setEnteredPassingGrade] = useState("");
  const [enteredShowCorrectAnswers, setEnteredShowCorrectAnswers] =
    useState(true);
  const [enteredHeader, setEnteredHeader] = useState("");
  const [enteredCertificateTemplate, setenteredCertificateTemplate] = useState(
    TestModel.CertificateTemplates[1]
  );
  const [enteredMsgOnSuccess, setEnteredMsgOnSuccess] = useState("");
  const [enteredMsgOnFailur, setEnteredMsgOnFailur] = useState("");
  const [testIsActive, setTestIsActive] = useState(false);
  //Email Delivery
  const [emailDeliveryStatus, setEmailDeliveryStatus] = useState(false);
  const [emailDeliveryFrom, setEmailDeliveryFrom] = useState("");
  const [emailDeliveryCC, seteEmailDeliveryCC] = useState("");
  const [emailDeliveryBCC, setEmailDeliveryBCC] = useState("");
  const [emailDeliverySuccessMsgSubject, setEmailDeliverySuccessMsgSubject] =
    useState("");
  const [emailDeliverySuccessMsgBody, setEmailDeliverySuccessMsgBody] =
    useState("");
  const [emailDeliveryFailurMsgSubject, setEmailDeliveryFailurMsgSubject] =
    useState("");
  const [emailDeliveryFailurMsgBody, setEmailDeliveryFailurMsgBody] =
    useState("");
  //Questions selection:
  const [enteredSelectedQuestions, setEnteredSelectedQuestions] = useState([]);
  //validations:
  // const [errors, setErrors] = useState(null);

  const TestStatusHandler = (event) => {
    event.target.checked ? setTestIsActive(true) : setTestIsActive(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // if (!validateForm()) {
    // } else {
    const newTest = {
      name: enteredName,
      subject: props.Subject,
      type: enteredType,
      language: enteredLang,
      passingGrade: enteredPassingGrade,
      showCorrectAnswers: enteredShowCorrectAnswers,
      header: enteredHeader,
      certificateTemplates: enteredCertificateTemplate,
      isActive: testIsActive,
      msgOnSuccess: enteredMsgOnSuccess,
      msgOnFailure: enteredMsgOnFailur,
      emailDelivery: {
        status: emailDeliveryStatus,
        from: emailDeliveryFrom,
        cc: emailDeliveryCC,
        bcc: emailDeliveryBCC,
        passingTheTest: {
          msgSubject: emailDeliverySuccessMsgSubject,
          msgBody: emailDeliverySuccessMsgBody,
        },
        fallingTheTest: {
          msgSubject: emailDeliveryFailurMsgSubject,
          msgBody: emailDeliveryFailurMsgBody,
        },
      },
      Questions: enteredSelectedQuestions,
    };
    TestService.addTest(newTest);
    console.log(newTest);
    props.OnInEdiitngStateChange();
  };

  // const validateForm = () => {
  //   let errors = {};
  //   let formIsValid = true;

  //   if (enteredName === "") {
  //     formIsValid = false;
  //     errors["name"] = "Please enter a test name";
  //   }
  //   setErrors(errors);
  //   console.log(errors);
  //   // return formIsValid;
  // };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="new-test__controls">
          <div className="new-test__generalInfo">
            <div className="new-test__control">
              <label>Field of Study: </label>
              <label>{props.Subject.SubjectName}</label>
            </div>
            <GeneralInfo
              onLanguageChange={setEnteredLang}
              Language={enteredLang}
              onTypeSelect={setEnteredType}
              Type={enteredType}
              Types={TestModel.TestType}
              Name={enteredName}
              onNameChange={setEnteredName}
              PassingGrade={enteredPassingGrade}
              onPassingGradeChange={setEnteredPassingGrade}
              ShowCorrectAnswers={enteredShowCorrectAnswers}
              onShowAnswersChange={setEnteredShowCorrectAnswers}
              Header={enteredHeader}
              onHeaderChange={setEnteredHeader}
              MsgOnSuccess={enteredMsgOnSuccess}
              onMsgOnSuccessChange={setEnteredMsgOnSuccess}
              MsgOnFailure={enteredMsgOnFailur}
              onMsgOnFailureChange={setEnteredMsgOnFailur}
              CertificateTemplate={enteredCertificateTemplate}
              CertificateTemplates={TestModel.CertificateTemplates}
              onCertificateTemplatesSelectChange={setenteredCertificateTemplate}
            />
          </div>
          <div className="new-test__EmailDelivery">
            <EmailDelivery
              status={emailDeliveryStatus}
              onStatusChange={setEmailDeliveryStatus}
              From={emailDeliveryFrom}
              onFromChange={setEmailDeliveryFrom}
              CC={emailDeliveryCC}
              onCcChange={seteEmailDeliveryCC}
              BCC={emailDeliveryBCC}
              onBccChange={setEmailDeliveryBCC}
              PassingSubject={emailDeliverySuccessMsgSubject}
              onPassingEmailSubjectChange={setEmailDeliverySuccessMsgSubject}
              PassingBody={emailDeliverySuccessMsgBody}
              onPassingEmailBodyChange={setEmailDeliverySuccessMsgBody}
              FallingSubject={emailDeliveryFailurMsgSubject}
              onFaillingEmailSubjectChange={setEmailDeliveryFailurMsgSubject}
              FallingBody={emailDeliveryFailurMsgBody}
              onFaillingEmailBodyChange={setEmailDeliveryFailurMsgBody}
            />
          </div>
          <div>
            <QuestionSelector
              // {...console.log(enteredType)}
              subject={props.Subject}
              TestType={enteredType}
              SelectedQuestions={enteredSelectedQuestions}
              OnSelectedQuestionsChange={setEnteredSelectedQuestions}
            />
          </div>
          <div className="new-test__control">
            <label>Active Test: </label>
            <input
              type="checkbox"
              checked={testIsActive}
              value={testIsActive}
              onChange={TestStatusHandler}
            />
            <label>active</label>
          </div>

          <div className="new-test__actions">
            <button type="submit">Add Test</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TestsForm;
