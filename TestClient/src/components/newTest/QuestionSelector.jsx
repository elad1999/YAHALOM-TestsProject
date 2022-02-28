import { Component } from "react";
import TestService from "../../services/testService.ts";
import QuestionsFilter from "./QuestionsFilter";
import QuestionsTable from "./QuestionsTable";

class QuestionSelector extends Component {
  state = {
    Questions: [],
    TestType: this.props.TestType,
    FilterStatus: false,
    CurrentPage: 0,
  };

  async componentDidMount() {
    await this.getQuestions();
  }

  async getQuestions() {
    const { data } = await TestService.getAllQuestions();
    let Questions = [];
    data.Questions.forEach((question) => {
      if (question.SubjectId === this.props.subject.SubjectId) {
        question.isSelected = false;
        question.isFiltered = true;
        Questions.push(question);
      }
    });
    this.setState({ Questions });
  }

  getSelectedQuestions(questions){
    let selectedQuestions = [];
    questions.forEach((q) => {
      if (q.isSelected) {
        selectedQuestions.push(q.QuestionId);
      }
    });
    console.log(selectedQuestions);
    return selectedQuestions;
  }
  onSelectQuestionChange(id) {
    const questions = [...this.state.Questions];
    const question = questions.find((q) => q.QuestionId === parseInt(id));
    question.isSelected = !question.isSelected;
    this.setState({ Questions: questions });
    this.props.OnSelectedQuestionsChange(this.getSelectedQuestions(questions));
  }

  onSelectAllChangeHandler(selected) {
    const selectedIds = selected.map((q) => q.QuestionId);
    const questions = this.state.Questions;
    questions.map((q) => {
      selectedIds.includes(q.QuestionId)
        ? (q.isSelected = true)
        : (q.isSelected = q.isSelected);
    });
    this.setState({ Question: questions });
    this.props.OnSelectedQuestionsChange(this.getSelectedQuestions(questions));
  }
  onUnSelectAllChangeHandler(unselected){
    const unSelectedIds = unselected.map((q) => q.QuestionId);
    const questions = this.state.Questions;
    questions.map((q) => {
      unSelectedIds.includes(q.QuestionId)
        ? (q.isSelected = false)
        : (q.isSelected = q.isSelected);
    });
    this.setState({ Question: questions });
    this.props.OnSelectedQuestionsChange(this.getSelectedQuestions(questions));
  }

  LinkClickHandler() {
    console.log("move focus to General Info section");
  }

  FilterQuestions(questions, tag) {
    let result = [];
    questions.forEach((q) => {
      if (q.QuestionTitle.includes(tag)) result.push(q); //add more filtered fields here
    });
    return result;
  }

  FiltersHandler(filters) {
    let filteredResult = []; //local variable: array of filtered questions result arrays--[filter1result[{question1},{...}], filter2result[{...}]]
    filters.forEach((filter) => {
      filteredResult.push(this.FilterQuestions(this.state.Questions, filter));
    });
    const uniqId = filteredResult
      .flat()
      .reduce((ids, question) => ids.add(question.QuestionId), new Set()); //new set of unique questions ids as objects
    const uniqIds = [...uniqId]; //flat to array of ids
    const questions = this.state.Questions;
    questions.map((q) => {
      uniqIds.includes(q.QuestionId)
        ? (q.isFiltered = true)
        : (q.isFiltered = false);
    });
    this.setState({ Questions: questions });
  }

  FilterStatusChangeHandler(e) {
    const questions = this.state.Questions;
    if (!e) {
      questions.map((q) => {
        q.isFiltered = true;
      });
      this.setState({ Questions: questions, CurrentPage: 0 });
    }
    this.setState({ FilterStatus: e });
  }

  onPageChangeHandler(pageNum) {
    this.setState({ CurrentPage: pageNum });
  }

  render() {
    return (
      <div>
        <h3>Questions:</h3>
        {this.props.TestType === "Predefined" && (
          <div>
            <p>
              <strong>
                Note: This test is set to be a 'Predefined' test, which means:
              </strong>
            </p>
            <ul>
              <li>
                All the questions that you select here will be included in the
                test.
              </li>
              <li>
                All respondents will receive the SAME set of questions,
                presented in a different order.
              </li>
            </ul>
            <p>
              If you want each respondent to receive a different set of
              questions, change the test type to 'Random' in the
              <a href="#" onClick={this.LinkClickHandler}>
                Test Details
              </a>{" "}
              section.
            </p>
          </div>
        )}
        {this.props.TestType === "Random" && <div>Im Random</div>}
        <div>
          <QuestionsFilter
            onFilterInputChange={this.FiltersHandler.bind(this)}
            FilterStatus={this.state.FilterStatus}
            onFilterStatusChange={this.FilterStatusChangeHandler.bind(this)}
          />
        </div>
        {this.state.Questions.length > 0 ? (
          <QuestionsTable //pass Questions with isSelected and isFiltered only!
            Questions={this.state.Questions}
            onSelectQuestion={this.onSelectQuestionChange.bind(this)}
            CurrentPage={this.state.CurrentPage}
            onPageChange={this.onPageChangeHandler.bind(this)}
            onSelectAllChange={this.onSelectAllChangeHandler.bind(this)}
            onUnSelectAllChange={this.onUnSelectAllChangeHandler.bind(this)}
          />
        ) : (
          "no questions found"
        )}
      </div>
    );
  }
}

export default QuestionSelector;
