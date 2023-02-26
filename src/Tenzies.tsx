import './Tenzies.css'
import Die from "./components/Die";
import {SyntheticEvent, useState} from "react";

function Tenzies() {
  const [dices, setDices] = useState(Array(10).fill({value: 0, selected: false}))
  const [selectedNumber, setSelectedNumber] = useState(0)

  console.log(dices)

  function diceClickHandle(event: SyntheticEvent) {
    const digit = event.target.value

  }

  return (
    <div className="app">
      <div className="ui">
        <div className="tenzies-title">
          <h1>Tenzies</h1>
        </div>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className={"die-grid"}> {/* Grid which holds the dices */}
          {dices.map((dieState: DieState, index) => <Die key={index} selected={index % 3 == 0} digit={dieState.value} onClick={diceClickHandle}/>)}
        </div>
        <div className="submit">
          <button>Roll</button>
        </div>
      </div>
    </div>
  )
}

export default Tenzies

interface DieState {
  value: number,
  selected: boolean
}