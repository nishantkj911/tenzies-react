import './Tenzies.css'
import Die from "./components/Die";
import {useEffect, useState} from "react";
import Confetti from "react-confetti";
import {nanoid} from "nanoid";

function Tenzies() {
  const [dices, setDices]: [DieState[], Function] = useState(Array(10).fill({index: 0, value: 0, selected: false}))
  const [gameOver, setGameOver] = useState(false)

  useEffect(rollDice, [gameOver])

  useEffect(() => {
    const allSameNumber = dices.every((dice) => (dice.value === dices[0].value));
    const allSelected = dices.every((dice) => dice.selected)

    if (allSelected && allSameNumber) {
      setGameOver(true)
    }
  }, [dices])

  console.log(dices)

  function diceHandleClick(id: string) {
    setDices(dices.map((dice) => (
      dice.id == id ? {
        ...dice,
        selected: !dice.selected
      } : dice
    )))
  }

  function rollDice() {
    setDices(dices.map((dieState, index) => ({
      ...dieState,
      index: index,
      id: dieState.selected ? dieState.id : nanoid(),
      value: dieState.selected ? dieState.value : Math.ceil(Math.random() * 6),
    })))
  }

  function resetGame() {
    setDices(Array(10).fill({index: 0, value: 0, selected: false}))
    setGameOver(false)
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
          {dices.map((dieState: DieState, index) => <Die key={dieState.id} state={dieState}
                                                         onClick={() => diceHandleClick(dieState.id)}/>)}
        </div>
        <div className="submit">
          <button onClick={gameOver ? resetGame : rollDice}>{gameOver ? "Reset Game" : "Roll"}</button>
        </div>
      </div>
    </div>
  )
}

export default Tenzies

export interface DieState {
  value: number,
  selected: boolean,
  id: string
}