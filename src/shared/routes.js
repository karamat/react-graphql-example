import { Router, Route, Link } from "react-router";  
import React from "react";
import AppHandler from "./components/AppHandler";
import UsersHandler from "./components/UsersHandler";
import StoriesHandler from "./components/StoriesHandler";

export default (
  <Router>
    <Route path="/" component={ AppHandler } >
      <Route path="users" component={ UsersHandler }></Route>
      <Route path="stories" component={ StoriesHandler }></Route>
    </Route>
  </Router>
);
