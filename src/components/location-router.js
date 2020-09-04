import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import ExampleLocation from "./location-screens/example";
import KioskScreen from "./location-screens/KioskScreen";
import ValuesWall from "./location-screens/ValuesWall";

export default function LocationRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <KioskScreen />
      </Route>
      <Route exact path="/2">
        You are at the 2nd path
        <Link to="/">Page 1</Link>
      </Route>
      <Route exact path="/values_wall">
        <ValuesWall />
      </Route>
    </Switch>
  );
}
