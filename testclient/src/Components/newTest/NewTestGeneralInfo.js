import { Editor } from "@tinymce/tinymce-react";

const GeneralInfo = (props) => {
  const LanguageChangeHandler = (event) => {
    props.onLanguageChange(event.target.value);
  };
  const TypeSelectHandler = (event) => {
    props.onTypeSelect(event.target.value);
  };
  const NameChangeHandler = (event) => {
    props.onNameChange(event.target.value);
  };
  const PassingGradeChangeHandler = (event) => {
    props.onPassingGradeChange(event.target.value);
  };
  const ShowAnswersChangeHandler = (event) => {
    props.onShowAnswersChange(event.target.checked);
  };
  const HeaderChangeHandler = (event) => {
    props.onHeaderChange(event);
  };
  const MsgOnSuccessChangeHandler = (event) => {
    props.onMsgOnSuccessChange(event);
  };
  const MsgOnFailurChangeHandler = (event) => {
    props.onMsgOnFailureChange(event);
  };
  const CertificateTemplateSelectHandler = (event) => {
    props.onCertificateTemplatesSelectChange(event.target.value);
  };

  return (
    <div>
      <div className="general-info__control">
        <label>language</label>
        <input
          type="text"
          value={props.Language}
          onChange={LanguageChangeHandler}
        />
      </div>
      <div className="general-info__control">
        <label>Test Type: </label>
        <select value={props.Type} onChange={TypeSelectHandler}>
          <option value={props.Types[1]}>
            Predefined - Same questions for all respondants
          </option>
          <option value={props.Types[2]}>
            Random - Random questions from picked questions pool
          </option>
        </select>
      </div>
      <div className="general-info__control">
        <label>Test Name: </label>
        <input type="text" value={props.Name} onChange={NameChangeHandler} />
      </div>
      <div className="general-info__control">
        <label>Passing Grade: </label>
        <input
          type="number"
          value={props.PassingGrade}
          onChange={PassingGradeChangeHandler}
        />
      </div>
      <div className="general-info__control">
        <label>Show Correct Answers After Submission: </label>
        <input
          type="checkbox"
          checked={props.ShowCorrectAnswers}
          onChange={ShowAnswersChangeHandler}
        />
        <label>show</label>
      </div>
      <div className="general-info__control">
        <label>Header: </label>
        <Editor
          apiKey="63q75w5ti3xz7yhn1yj4u0qi0uk8xralx1vwt2d8r5pdhd8m"
          value={props.Header}
          init={{
            height: 150,
            width: 300,
            menubar: false,
          }}
          onEditorChange={HeaderChangeHandler}
        />
      </div>
      <div className="general-info__control">
        <label>Message to Show on Success: </label>
        <Editor
          value={props.MsgOnSuccess}
          init={{
            height: 150,
            width: 300,
            menubar: false,
          }}
          onEditorChange={MsgOnSuccessChangeHandler}
        />
      </div>
      <div className="general-info__control">
        <label>Message to Show on Failur: </label>
        <Editor
          value={props.MsgOnFailure}
          init={{
            height: 150,
            width: 300,
            menubar: false,
          }}
          onEditorChange={MsgOnFailurChangeHandler}
        />
      </div>
      <div className="general-info__control">
        <label>Certificate Template: </label>
        <select
          value={props.CertificateTemplate}
          onChange={CertificateTemplateSelectHandler}
        >
          <option>{props.CertificateTemplates[1]}</option>
          <option>{props.CertificateTemplates[2]}</option>
          <option>{props.CertificateTemplates[3]}</option>
        </select>
      </div>
    </div>
  );
};

export default GeneralInfo;
