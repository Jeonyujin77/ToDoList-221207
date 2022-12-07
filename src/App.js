import { Routes, Route } from "react-router-dom";
import { Detail } from "./routes/Detail";
import { Home } from "./routes/Home";
import { useDispatch } from "react-redux";
import { __getTodos } from "./lib/api";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
