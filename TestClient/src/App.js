import "./App.css";
import "./Components/NewTest";
import { Route, Routes } from "react-router-dom";
import { EditQuestion, QuestionsManager } from "./views";
import Main from "./Components/Main";

const App = () => {
  return (
    <div className="App">
      <div className="Container">
        <Routes>
          <Route path="/manage-questions" element={<QuestionsManager />}></Route>
          <Route path="/edit-question" element={<EditQuestion />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="*" element={<Main />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
