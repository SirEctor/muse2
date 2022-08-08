import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./components/Login";
import Error from "./components/Error";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { HashRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/muse2" element={<App />} />
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </HashRouter>
);

