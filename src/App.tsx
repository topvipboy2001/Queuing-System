import React from "react";
import "./App.less";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextRoute from "./Routes/ContextRoute";
import AuthRoutes from "./Routes/AuthRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ContextRoute />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
