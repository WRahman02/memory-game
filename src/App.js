import './App.css'
import {useEffect, useState} from 'react'
import Card from './component/Card'

const cardImages = [
  {"src": "/images/A.png", match : false},
  {"src": "/images/B.png", match : false},
  {"src": "/images/C.png", match : false},
  {"src": "/images/D.png", match : false},
  {"src": "/images/E.png", match : false},
  {"src": "/images/F.png", match : false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState (false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() -.5)
      .map((card) => ({...card, id: Math.random()}))

    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  console.log(cards,turns)

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice (card) : setFirstChoice(card)
  }
  useEffect(() => {
    
    if (firstChoice && secondChoice)
    {
      setDisabled(true)
      if (firstChoice.src === secondChoice.src)
      {
        setCards (prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src)
            {
              return {...card, match: true}
            }
            else
            {
              return card
            }
          })
        })
      }
      else
      {
        console.log('not a match')
        resetTurns()
      }
    }
  }, [firstChoice, secondChoice])
  console.log(cards)
  const resetTurns = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled (false)
  }
  useEffect (() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>restart</button>
      <div className='card-array'>
        {cards.map(card => (
          <Card 
          key={card.id} 
          card={card} 
          handleChoice ={handleChoice}
          flipped={card === firstChoice || card === secondChoice || card.match}
          disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App