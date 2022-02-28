import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./EmailDelivery.css";

const EmailDeliveryOnTestComplete = (props) => {
  const [disabled, setDisabled] = useState(true);

  const FromChangeHandler = (event) => {
    if (event.target.value.length >= 1) {
      setDisabled(false);
      props.onStatusChange(true);
    } else {
      setDisabled(true);
      props.onStatusChange(false);
    }
    props.onFromChange(event.target.value);
  };
  const CcChangeHandler = (event) => {
    props.onCcChange(event.target.value);
  };
  const BccChangeHandler = (event) => {
    props.onBccChange(event.target.value);
  };
  const PassingEmailSubjectHandler = (event) => {
    props.onPassingEmailSubjectChange(event.target.value);
  };
  const PassingEmailBodyHandler = (event) => {
    props.onPassingEmailBodyChange(event);
  };
  const FaillingEmailSubjectHandler = (event) => {
    props.onFaillingEmailSubjectChange(event.target.value);
  };
  const FaillingEmailBodyHandler = (event) => {
    props.onFaillingEmailBodyChange(event);
  };

  return (
    <div>
      <div>Email Delivery Upon Test Completion</div>
      <div>
        <label>Current Status: </label>
        {props.status === false ? (
          <div>
            OFF
            <br />
            Email won't be sent upon test completion.
            <br />
            To turn on email delivery fill out the mandetory fields in this
            seciton
          </div>
        ) : (
          <div>ON</div>
        )}
      </div>
      <div>
        <label>From: </label>
        <input type="Email" value={props.From} onChange={FromChangeHandler} />
      </div>
      <div className={disabled ? "email-cc__disabled" : "email-cc"}>
        <label>CC: </label>
        <input type="Email" value={props.CC} onChange={CcChangeHandler} />
      </div>
      <div className={disabled ? "email-cc__disabled" : "email-cc"}>
        <label>BCC: </label>
        <input type="Email" value={props.BCC} onChange={BccChangeHandler} />
      </div>
      <div className="email-passing">
        Passing the Test
        <div className="email-passing__control">
          <div
            className={disabled ? "email-passing__disabled" : "email-passing"}
          >
            <label>Message Subject: </label>
            <input
              type="text"
              value={props.PassingSubject}
              onChange={PassingEmailSubjectHandler}
            />
            <label>Message Body: </label>
            <Editor
              value={props.PassingBody}
              init={{
                height: 150,
                width: 300,
                menubar: false,
              }}
              onEditorChange={PassingEmailBodyHandler}
            />
          </div>
        </div>
      </div>
      <div className="email-failed">
        Failling the Test
        <div className="email-failed__control">
          <div className={disabled ? "email-failed__disabled" : "email-failed"}>
            <label>Message Subject: </label>
            <input
              type="text"
              value={props.FallingSubject}
              onChange={FaillingEmailSubjectHandler}
            />
            <label>Message Body: </label>
            <Editor
              value={props.FallingBody}
              init={{
                height: 150,
                width: 300,
                menubar: false,
              }}
              onEditorChange={FaillingEmailBodyHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDeliveryOnTestComplete;
