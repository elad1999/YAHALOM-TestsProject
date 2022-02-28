import { Component } from "react";
import "./QuestionsTable.css";

class QuestionsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inPageView: true,
    };
  }

  setToPages(questions) {
    let pages = [];
    for (let i = 0; i < questions.length; ) {
      let page = [];
      for (let j = i, k = 0; k < 10 && j < questions.length; j++, i++) {
        if (questions[j].isFiltered) {
          page.push(questions[j]);
          k++;
        }
      }
      pages.push(page);
    }
    return pages;
  }
  setToSinglePage(questions) {
    let pages = [];
    let page = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].isFiltered) {
        page.push(questions[i]);
      }
    }
    pages.push(page);
    return pages;
  }

  getPageSelectedQuestions(pageNum) {
    const selected = this.setToPages(this.props.Questions)[pageNum].filter(
      (questions) => questions.isSelected === true
    );
    return selected.length;
  }

  getAllSelectedQuestions() {
    const selected = this.props.Questions.filter((q) => q.isSelected === true);
    return selected.length;
  }

  selectQuestionsHandler(e) {
    this.props.onSelectQuestion(e.target.id);
  }

  NextPageClickHandler() {
    this.props.onPageChange(this.props.CurrentPage + 1);
  }
  PreviousPageClickHandler() {
    this.props.onPageChange(this.props.CurrentPage - 1);
  }

  PageViewChangeHandler(event) {
    this.props.onPageChange(0);
    this.setState({ inPageView: !this.state.inPageView });
    event.preventDefault();
  }
  SelectAllHandler(event) {
    const Pages = this.state.inPageView
      ? this.setToPages(this.props.Questions)
      : this.setToSinglePage(this.props.Questions);
    this.props.onSelectAllChange(Pages[this.props.CurrentPage]);
    event.preventDefault();
  }
  UnSelectAllHandler(event){
    const Pages = this.state.inPageView
      ? this.setToPages(this.props.Questions)
      : this.setToSinglePage(this.props.Questions);
    this.props.onUnSelectAllChange(Pages[this.props.CurrentPage]);
    event.preventDefault();
  }

  render() {
    const Pages = this.state.inPageView
      ? this.setToPages(this.props.Questions)
      : this.setToSinglePage(this.props.Questions);
    const CurrentPage = this.props.CurrentPage;

    return (
      <div>
        <label>
          Choose from the following {Pages.flat().length} questions (
          {this.state.inPageView
            ? this.getPageSelectedQuestions(CurrentPage)
            : this.getAllSelectedQuestions()}{" "}
          selected on this page)
        </label>
        <label>
          {" "}
          ~~~~ Total selected for the test: {this.getAllSelectedQuestions()} ~~~
        </label>
        <label>
          {this.getPageSelectedQuestions(CurrentPage) !==
          Pages[CurrentPage].length ? (
            <button onClick={this.SelectAllHandler.bind(this)}>
              Select All
            </button>
          ) : (
            <button onClick={this.UnSelectAllHandler.bind(this)}>
              UnSelect All
            </button>
          )}
        </label>
        <div>
          {Pages[CurrentPage]
            ? Pages[CurrentPage].map((question) => (
                <div
                  className={question.isSelected ? "selected" : "notSelected"}
                  key={question.QuestionId}
                  id={question.QuestionId}
                  onClick={this.selectQuestionsHandler.bind(this)}
                >
                  {question.QuestionTitle}
                </div>
              ))
            : "no questions"}
        </div>
        <div>
          {Pages[CurrentPage - 1] && (
            <button onClick={this.PreviousPageClickHandler.bind(this)}>
              {CurrentPage} - Previous
            </button>
          )}
          <label>
            Showing {CurrentPage * 10 + 1} -{" "}
            {CurrentPage * 10 + Pages[CurrentPage].length} questions
          </label>
          {Pages[CurrentPage + 1] && (
            <button onClick={this.NextPageClickHandler.bind(this)}>
              Next - {CurrentPage + 2}
            </button>
          )}
        </div>
        <button onClick={this.PageViewChangeHandler.bind(this)}>
          {this.state.inPageView?"show full view":"show pages view"}
        </button>
      </div>
    );
  }
}

export default QuestionsTable;
