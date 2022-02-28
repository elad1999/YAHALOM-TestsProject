import { Component } from "react";
import {getAllTests} from "../../Services/testService";

class TestsTable extends Component {
  state = {
    Tests: [],
  };

  async componentDidMount() {
    await this.getTests();
  }

  async getTests() {
    const { data } = await getAllTests();
    let tests = [];
    data.Exams.forEach((test) => {
      if (test.SubjectId === this.props.subject.SubjectId) {
        tests.push(test);
      }
    });
    this.setState({ Tests: tests });
  }

  render() {
    return (
      <div>
        <table className="TestsTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Link</th>
              <th scope="col">Test Name</th>
              <th scope="col">Num of Questions</th>
              <th scope="col">Last Update</th>
              <th scope="col">Type</th>
              <th scope="col">Version</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Tests.map((test) => (
              <tr key={test.ExamId}>
                <th scope="row">{test.ExamId}</th>
                <td>
                  <button>Copy</button>
                </td>
                <td>{test.Title}</td>
                <td>{test.Questions.length}</td>
                <td>{test.LastUpdate}</td>
                <td>{test.TestType}</td>
                <td>{test.Version}</td>
                <td>
                  <button>Edit</button>
                  <button>Duplicate</button>
                  <label>{test.IsActive ? "Active" : "Inactive"}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TestsTable;
