import { Component } from "react";
import {getAllSubjects,getTestModel} from "../Services/testService";
import NewTest from "./newTest/NewTest";
import "./Main.css";
// import { Line, Field, Dropdown } from "./globalComponents/index";
import TestManager from "./manageTests/TestsManager";

class Main extends Component {
  state = {
    subjects: [],
    isEditingTest: false,
    isEditingQuestion: false,
    isViewingReports: false,
    isManagingTests: false,
    selectedsubject: null,
    testModel: null,
  };

  async componentDidMount() {
    await this.getSubjects();
    this.setFirstSubject();
    this.getTestModel();
  }

  async getSubjects() {
    const { data } = await getAllSubjects();
    console.log(data);
    this.setState({ subjects: data.Subjects });
  }
  setFirstSubject() {
    this.setState({ selectedsubject: this.state.subjects[0] });
  }

  async getTestModel() {
    const { data } = await getTestModel();
    this.setState({ testModel: data });
  }

  manageTestHandler() {
    this.setState({ isManagingTests: true });
  }
  addTestHandler() {
    this.setState({ isEditingTest: true, isManagingTests: false });
  }

  cancelBtnHandler() {
    if (this.state.isEditingTest)
      this.setState({ isEditingTest: false, isManagingTests: true });
    if (this.state.isManagingTests) this.setState({ isManagingTests: false });
    this.setFirstSubject();
  }

  subjectSelectHandler(event) {
    let subject = this.state.subjects.find(
      (sub) => sub.SubjectName === event.target.value
    );
    this.setState({ selectedsubject: subject });
  }

  render() {
    return (
      <div>
        {!this.state.isEditingQuestion &&
          !this.state.isEditingTest &&
          !this.state.isViewingReports &&
          !this.state.isManagingTests && (
            <div className="main__container">
              <div className="main__header">
                Administration System - Sela College
              </div>
              <div className="main-box">
                <div className="main-box__title">Main Menu</div>
                <div className="main-box__menu">
                  <div className="main-box__subject">
                    <label>Choose a field of study: </label>
                    <select
                      select={this.state.selectedsubject}
                      onChange={this.subjectSelectHandler.bind(this)}
                    >
                      {this.state.subjects.map((sub) => (
                        <option key={sub.SubjectId} value={this.sub}>
                          {sub.SubjectName}
                        </option>
                      ))}
                    </select>
                    {/* <Field>
                    <label>Choose a field of study: </label>
                    <Dropdown list={this.state.subjects.map((sub)=>({id: sub.SubjectId, value: sub.SubjectName}))} onChange={this.subjectSelectHandler.bind(this)}>
                    </Dropdown>
                    </Field> */}
                  </div>
                  <div>Manage Questions</div>
                  <div
                    className="main-box__goToTestsManagerBtn"
                    onClick={this.manageTestHandler.bind(this)}
                  >
                    Manage Tests
                  </div>
                  <div>Reports</div>
                </div>
              </div>
            </div>
          )}
        {this.state.isEditingTest && (
          <div>
            <NewTest
              inEditingTest={this.state.isEditingTest}
              subject={this.state.selectedsubject}
              cancel={this.cancelBtnHandler.bind(this)}
              testModel={this.state.testModel}
            />
          </div>
        )}

        {this.state.isManagingTests && (
          <div>
            <TestManager
              subject={this.state.selectedsubject}
              cancel={this.cancelBtnHandler.bind(this)}
              addTest={this.addTestHandler.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Main;
