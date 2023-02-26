import './Tenzies.css'
import Die from "./components/Die";
import {SyntheticEvent, useEffect, useState} from "react";
import Confetti from "react-confetti";

function Tenzies() {
  const [dices, setDices]: [DieState[], Function] = useState(Array(10).fill({index: 0, value: 0, selected: false}))
  const [selectedNumber, setSelectedNumber] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(rollDie, [gameOver])

  useEffect(() => {
    let allSelected = true
    for (const dice of dices) {
      allSelected = allSelected && dice.selected
    }

    if (allSelected) {
      setGameOver(true)
    }
  }, [dices])

  console.log(dices)

  function diceHandleClick(event: SyntheticEvent, state: DieState) {
    if (selectedNumber == 0) {
      setSelectedNumber(state.value)

      setDices((prevDices: DieState[]) => {
        let newDices = [...prevDices]
        newDices[state.index].selected = true;

        return newDices
      })
    } else if (selectedNumber == state.value) {
      setDices((prevDices: DieState[]) => {
        let newDices = [...prevDices]
        newDices[state.index].selected = true;

        return newDices
      })
    }



  }

  function rollDie() {
    setDices(dices.map((dieState, index) => ({
      ...dieState,
      index: index,
      value: dieState.selected ? dieState.value : Math.ceil(Math.random() * 6),
    })))
  }

  function resetGame() {
    setDices(Array(10).fill({index: 0, value: 0, selected: false}))
    setGameOver(false)
    setSelectedNumber(0)
  }

  return (
    <div className="app">
      <div className="ui">
        {gameOver ? <Confetti/> : ""}
        <div className="tenzies-title">
          <h1>Tenzies</h1>
        </div>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className={"die-grid"}> {/* Grid which holds the dices */}
          {dices.map((dieState: DieState, index) => <Die key={index} state={dieState} onClick={diceHandleClick}/>)}
        </div>
        <div className="submit">
          <button onClick={gameOver ? resetGame : rollDie}>{gameOver ? "Reset Game" : "Roll"}</button>
        </div>
      </div>
    </div>
  )
}

export default Tenzies

export interface DieState {
  index: number
  value: number,
  selected: boolean
}