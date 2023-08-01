import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/editor/:formId" element={<FormEditor />} />
                <Route path="/preview/:formId" element={<FormPreview />} />
            </Routes>
        </Router>
    );
}

export default App;
