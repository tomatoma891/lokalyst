import React, { useState, useEffect } from "react";
import "./App.css";
// import { GoogleLogin } from "react-google-login";

// React Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Login from "./Pages/Login";
import GoogleGrade from "./Components/GoogleGrade/GoogleGrade";
import NavBar from "./Components/NavBar/NavBar";
import Calendar from "./Components/Calendar/Calendar";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login}></Route>
      <NavBar />
      <Route exact path="/googlegrade">
        <GoogleGrade />
      </Route>
      <Route exact path="/calendar" component={Calendar}></Route>
    </Router>
  );
};

export default App;
