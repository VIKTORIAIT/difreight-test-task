import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import { TaskProvider } from "./hooks/useTaskContext";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />}></Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
