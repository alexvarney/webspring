import React from "react";
import { Route, Switch } from "react-router-dom";
import KioskScreen from "../panels/kiosk";
import ValuesWall from "../panels/values-wall";
import PetWall from "../panels/pet-wall";
import BookCase from "../panels/books";
import OutsideOffice from "../panels/outside-office";
import MainOffice from "../panels/main-office";
import FantasyWall from "../panels/fantasy-wall";
import DoorPuzzle from "../panels/door-lock";
import SphinxCode from "../panels/sphinx-code";
import BombRoom from "../panels/bomb-room";

export default function PanelRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <KioskScreen />
      </Route>
      <Route exact path="/bomb_room">
        <BombRoom />
      </Route>
      <Route exact path="/bookcase">
        <BookCase />
      </Route>
      <Route exact path="/door_puzzle">
        <DoorPuzzle />
      </Route>
      <Route exact path="/fantasy_wall">
        <FantasyWall />
      </Route>
      <Route exact path="/main_office">
        <MainOffice />
      </Route>
      <Route exact path="/outside_office">
        <OutsideOffice />
      </Route>
      <Route exact path="/pet_wall">
        <PetWall />
      </Route>
      <Route exact path="/sphinx_code">
        <SphinxCode />
      </Route>
      <Route exact path="/values_wall">
        <ValuesWall />
      </Route>
    </Switch>
  );
}
