import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function LocationRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          You are at the root path
          <Link to="/2">Page 2</Link>
        </Route>
        <Route exact path="/2">
          You are at the 2nd path
          <Link to="/">Page 1</Link>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
