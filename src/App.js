import React from 'react';
import './style.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dices, setDices] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const set = new Set(dices.map((dice) => (dice.value)))
    const areAllDicesHeld = dices.every(die => die.isHeld)
    if (areAllDicesHeld && set.size === 1) {
      console.log("Hurray, you won!")
      setTenzies(true)
    }
  }, [dices])

  function refreshState() {
    if (tenzies) {
      setTenzies(false)
      setDices(allNewDice())
    } else {
      setDices(prevDices => {
        const newDices = allNewDice()
        var resultingArray = []
        for (let index = 0; index < prevDices.length; index++) {
  
          if (prevDices[index].isHeld) {
            resultingArray.push(prevDices[index])
          } else {
            resultingArray.push(newDices[index])
          }
        }
        return resultingArray
      })
    }
  }

  function holdDice(id) {
    setDices(prevDices => {
      return prevDices.map((dice) => {
        if (dice.id === id) {
          return {
            ...dice,
            isHeld: !dice.isHeld
          }
        } else {
          return dice
        }
      })
    })
  }

  function allNewDice() {
    const resultingArray = []
    for (let index = 0; index < 10; index++) {
      resultingArray.push(
        {
          id: nanoid(),
          value: Math.floor(6 * Math.random()) + 1,
          isHeld: false
        }
      )
    }
    return resultingArray
  }

  function convertDiceToElement(object) {
    return (
      <Die key={object.id} value={object.value} isHeld={object.isHeld} onHold={() => holdDice(object.id)} />
    )
  }

  const dicesElements = dices.map((el) => {
    return (convertDiceToElement(el))
  })



  return (
    <main>
      <div className='container'>
        {dicesElements}
        {tenzies && <Confetti />}
      </div>
      <button
        className='button--roll'
        onClick={refreshState}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
