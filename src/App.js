import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeHistory from "./pages/EmployeeHistory";
import StockHistory from "./pages/StockHistory";
import Table from "./components/Table";
import Login from "./pages/Login";

import "./style/style.css";
import { createContext } from "react";
import { useState } from "react";
export const ContextData = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <ContextData.Provider value={{ loading, setLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/employeeHistory/:id" element={<EmployeeHistory />} />
          <Route path="/StockHistory/:id" element={<StockHistory />} />
          <Route path="/tab" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </ContextData.Provider>
  );
}

export default App;
