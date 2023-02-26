import React from "react";
import "./Die.css"

export default function Die({digit, selected, onClick}: { digit: number, selected: boolean, onClick: any }) {
  return (
    <button
      className={"die-button" + (selected ? " die-button-selected" : "")}
      onClick={onClick}
      value={digit}
    >
      {digit}
    </button>
  )
}