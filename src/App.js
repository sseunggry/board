import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import BoardPage from "./pages/board";
import BoardNew from "./pages/board/new";
import BoardEdit from "./pages/board/edit";
import BoardDetail from "./pages/board/detail";

function App() {
  return (
      <>
          <Routes>
              <Route path="/board" element={<BoardPage />} />
              <Route path="/board/:id" element={<BoardDetail />} />
              <Route path="/board/:id/:commentId" element={<BoardDetail />} />
              <Route path="/board/new" element={<BoardNew />} />
              <Route path="/board/edit/:id" element={<BoardEdit />} />
              <Route path="*" element={<Navigate replace to="/board" />} />
          </Routes>
      </>
  );
}

export default App;
