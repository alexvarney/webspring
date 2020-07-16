import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import ExampleLocation from "./location-screens/example";

export default function LocationRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <ExampleLocation />
      </Route>
      <Route exact path="/2">
        You are at the 2nd path
        <Link to="/">Page 1</Link>
      </Route>
    </Switch>
  );
}
