import React, { useMemo, useState } from "react";
import TinderCard from "react-tinder-card";
import { useSequentialSelections } from "../map-view/utils";
import { ImCross } from "react-icons/im";
import { IoHeartSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import {
  CardContainer,
  Card,
  ButtonsContainer,
  ActionButton,
  SwiperContainer,
} from "./swiper.styles";

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

const expectedSequence = ["left", "right", "left", "left", "right", "right"];

export default function TindawgSwiper({ onSuccess, onEmpty }) {
  const [characters, setCharacters] = useState([]);
  const [removedCharacters, setRemovedCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [sequence, addToSequence] = useSequentialSelections(expectedSequence);

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
    if (sequence.length === expectedSequence.length) {
      onSuccess();
    }
  }, [sequence]);

  return (
    <SwiperContainer>
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
        <IconContext.Provider value={{ color: "#F63654" }}>
          <ActionButton onClick={() => swipe("left")}>
            <ImCross />
          </ActionButton>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#30E5A5" }}>
          <ActionButton onClick={() => swipe("right")}>
            <IoHeartSharp />
          </ActionButton>
        </IconContext.Provider>
      </ButtonsContainer>
    </SwiperContainer>
  );
}
