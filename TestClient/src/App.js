import "./App.css";
import "./Components/NewTest";
import { Route, Routes ,Link} from "react-router-dom";
import MainMenu from "./views/mainMenu/MainMenu";
import { EditQuestion, QuestionsManager } from "./views";

const App = () => {
  return (
    <div className="App">
      <div className="Container">
        <Routes>
          <Route path="/manage-questions" element={<QuestionsManager />}></Route>
          <Route path="/edit-question" element={<EditQuestion />}></Route>
          <Route path="/" element={<MainMenu />}></Route>
          <Route path="*" element={<MainMenu />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
