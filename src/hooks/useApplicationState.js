import React, { useReducer } from "react";

export const ActionTypes = {
  unlocked: "UNLOCKED",
  setState: "SET_STATE",
  completePuzzle: "COMPLETE_PUZZLE",
};

//States: ['HIDDEN', 'MAP', 'LOCKSCREEN', 'LOCKSCREEN.UNLOCK', 'HOME', 'PLAYER', 'TINDOG']

export const StateContext = React.createContext();

const useApplicationState = () => {
  const initialState = {
    unlocked: false,
    appState: "TINDAWG",
    completedPuzzles: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ActionTypes.unlocked:
        return {
          ...state,
          unlocked: true,
        };
      case ActionTypes.setState:
        console.log(`State change: ${action.payload}`);

        return {
          ...state,
          appState: action.payload,
        };
      case ActionTypes.completePuzzle:
        return {
          ...state,
          completedPuzzles: [...state.completedPuzzles, action.payload],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useApplicationState;
