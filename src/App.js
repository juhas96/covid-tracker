import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ProgressBar } from "./components/ProgressBar";

const App = () => {
  return (
    <div className="app">
      <Home />
    </div>
  );
};

export default App;
