
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Loading(props) {

  const arr = props.state
  const [list, setList] = useState([])
  const [currentCard, setCurrentCard] = useState(null)

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  });

  const dragStartHandler = (e, card) => {
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
    setList(arr.map(i => {
      if (i.id === card.id) {
        return { ...i, id: currentCard.id }
      }
      if (i.id === currentCard.id) {
        return { ...i, id: card.id }
      }
      return i
    }))
    e.target.style.background = 'white'
  }

  const sortCards = (a, b) => {
    if (a.id > b.id) {
      return 1
    } else {
      return -1
    }
  }

  useEffect(() => { setList(props.state) }, [props.state])
  useEffect(() => {
    apiClient.post(`${process.env.REACT_APP_SERVER_URL + '/select/update'}`, list).then((response) => {
      if (response.status === 200) {
        console.log('ok')
      }
    })
      .catch((err) => {
        console.log(err)
      })
  })

  return <div className='itemContainer'>
    {list.sort(sortCards).map(item => (
      <div
        key={item.id}
        onDragStart={(e) => dragStartHandler(e, item)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, item)}
        draggable={true}
        className='selectItem'>
        <label className='selectLabel'>
          <input className='selectInput' type='checkbox' value={item.name} onChange={props.onChange} />
          {item.name}
        </label>
      </div>
    ))}
  </div>
}