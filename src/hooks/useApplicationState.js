import React, { useReducer } from "react";

export const ActionTypes = {
  unlocked: "UNLOCKED",
  setState: "SET_STATE",
};

//States: ['MAP', 'LOCKSCREEN', 'LOCKSCREEN.UNLOCK', 'HOME']

export const StateContext = React.createContext();

const useApplicationState = () => {
  const initialState = {
    unlocked: false,
    appState: "LOCKSCREEN.UNLOCK",
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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useApplicationState;
