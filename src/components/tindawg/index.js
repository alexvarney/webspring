import React, { useMemo, useState } from "react";
import styled from "styled-components";
import StateContainer from "../ui/state-container";
import TinderCard from "react-tinder-card";
import { useSequentialSelections } from "../map-view/utils";

const db = [
  {
    name: "Sphinx",
    url: "/office/sphinx.png",
  },
  {
    name: "Bookcase",
    url: "/office/bookcase.jpg",
  },
  {
    name: "Doorway",
    url: "/office/entrance.jpg",
  },
  {
    name: "Map",
    url: "/office/fantasy_map.jpg",
  },
  {
    name: "Fido",
    url: "/office/FidoDirectory.png",
  },
  {
    name: "Greenwall",
    url: "/office/greenwall.jpg",
  },
];

const Container = styled(StateContainer)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  flex-grow: 1;
  margin: 32px;
  border-radius: 8px;
  & > * {
    grid-column: 1;
    grid-row: 1;
    border-radius: 8px;

    :first-child {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.25);
    }
  }
  overflow: visible;
`;

const Card = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5%;
  font-weight: 700;
  color: #fff;
  font-size: 24px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.125);
  cursor: pointer;
  border-radius: 8px;
`;

const ButtonsContainer = styled.div`
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

export default function TindawgState() {
  const [characters, setCharacters] = useState([]);
  const [removedCharacters, setRemovedCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [sequence, addToSequence] = useSequentialSelections([
    "left",
    "right",
    "left",
    "left",
    "right",
    "right",
  ]);

  React.useEffect(() => {
    setCharacters(db);
    setRemovedCharacters([]);
  }, []);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [characters]
  );

  const swiped = React.useCallback(
    (direction, nameToDelete) => {
      console.log("removing: " + nameToDelete);
      setLastDirection(direction);
      setRemovedCharacters((prevState) => [...prevState, nameToDelete]);
    },
    [setRemovedCharacters, setLastDirection, characters]
  );

  const outOfFrame = React.useCallback(
    (name) => {
      console.log(name + " left the screen!");
      setCharacters((prevState) =>
        prevState.filter((character) => character.name !== name)
      );
    },
    [setCharacters, characters]
  );

  const swipe = React.useCallback(
    (dir) => {
      addToSequence(dir);

      const cardsLeft = characters.filter(
        (person) => !removedCharacters.includes(person.name)
      );
      if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
        const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
        setRemovedCharacters((prevState) => [...prevState, toBeRemoved]);
        // Make sure the next card gets removed next time if this card do not have time to exit the screen
        childRefs[index].current.swipe(dir); // Swipe the card!
      }
    },
    [characters, setRemovedCharacters, removedCharacters, db]
  );

  React.useEffect(() => {
    console.log(sequence);
  }, [sequence]);

  return (
    <Container>
      <CardContainer isEmpty={characters.length > 0}>
        {characters.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <Card
              style={{
                backgroundImage: "url(" + character.url + ")",
              }}
              className="card"
            >
              <h3>{character.name}</h3>
            </Card>
          </TinderCard>
        ))}
      </CardContainer>
      <ButtonsContainer>
        <button onClick={() => swipe("left")}>Swipe left!</button>
        <button onClick={() => swipe("right")}>Swipe right!</button>
      </ButtonsContainer>
    </Container>
  );
}
