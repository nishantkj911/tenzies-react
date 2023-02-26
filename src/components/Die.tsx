import React from "react";
import "./Die.css"
import {DieState} from "../Tenzies";

export default function Die({state, onClick}: { state: DieState, onClick: any }) {
  return (
    <button
      className={"die-button" + (state.selected ? " die-button-selected" : "")}
      onClick={(event) => onClick(event, state)}
      value={state.value}
      disabled={state.selected}
    >
      {state.value}
    </button>
  )
}