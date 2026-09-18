import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import CurrentFCPS from "./pages/CurrentFCPS.jsx";
import AddDepart from "./pages/AddDepart.jsx";
import AddSupervisor from "./pages/AddSupervisor.jsx";
import FCPSDetail from "./pages/FCPSDetail.jsx";
import Home from "./pages/Home.jsx";
import UploadFile from "./pages/UploadFile.jsx";

// All Reports
import CurrentSupervisorReport from "./reports/CurrentSupervisorReport.jsx";
import CurrentFCSReport from "./reports/CurrentFCSReport.jsx";
import YearlyReport from "./reports/YearlyReport.jsx";
// import TestReport from "./reports/TestReport.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addstudent" element={<AddStudent />} />
      <Route path="/current-fcps" element={<CurrentFCPS />} />
      <Route path="/add-depart" element={<AddDepart />} />
      <Route path="/supervisor" element={<AddSupervisor />} />
      <Route path="/detail/:id" element={<FCPSDetail />} />
      <Route path="/upload/:id" element={<UploadFile />} />
      {/* All Report */}
      <Route path="/current_supervisor" element={<CurrentSupervisorReport />} />
      <Route path="/fcps_report" element={<CurrentFCSReport />} />
      <Route path="/yearly_report" element={<YearlyReport />} />
    </Routes>
  </BrowserRouter>,
);
