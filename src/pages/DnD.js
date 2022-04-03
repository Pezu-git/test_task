import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function DnD() {
  const [list, setList] = useState([
    { id: 1, order: 3, text: 'Card 1' },
    { id: 2, order: 1, text: 'Card 2' },
    { id: 3, order: 2, text: 'Card 3' },
    { id: 4, order: 4, text: 'Card 4' }
  ])

  const [currentCard, setCurrentCard] = useState(null)

  const dragStartHandler = (e, card) => {
    console.log(card)
    setCurrentCard(card)
  }

  const dragEndHandler = (e) => {
    e.target.style.background = 'white'
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }
  const dropHandler = (e, card) => {
    e.preventDefault()
    setList(list.map(i => {
      if (i.id === card.id) {
        return { ...i, order: currentCard.order }
      }
      if (i.id === currentCard.id) {
        return { ...i, order: card.order }
      }
      return i
    }))
    e.target.style.background = 'white'
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className='cardContainer'>
      <Link to="/">Back</Link>
      {list.sort(sortCards).map(card =>
        <div
          key={card.id}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable={true}
          className='card'>
          {card.text}
        </div>
      )}
    </div>
  )
}