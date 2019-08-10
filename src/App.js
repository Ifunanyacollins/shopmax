import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/Layouts/Landing";
import Cart from "./components/Layouts/Cart";
import View from "./components/Layouts/View";
import AuthPage from "./components/Layouts/AuthPage";
import Checkout from "./components/Layouts/Checkout";

import "./App.css";

export default () => (
  <Router>
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/cart" component={Cart} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/view/:id" component={View} />
    </Switch>
  </Router>
);
