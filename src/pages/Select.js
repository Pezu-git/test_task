/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */


import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Select() {

  const [checked, setChecked] = useState([]);
  const [state, setState] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [index, setIndex] = useState(5)

  const [currentCard, setCurrentCard] = useState(null)

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  });

  const loader = () => {
    setIndex(index + 5)
  }

  const onChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setChecked(prevState => {
        if (!prevState.includes(e.target.value)) {
          prevState.push(e.target.value)
        }
        return prevState;
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await apiClient.post(`${process.env.REACT_APP_SERVER_URL + '/basket/store'}`, checked).then((response) => {
      if (response.status === 200) {
        alert('Сохранено в БД')
        window.location.reload();
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }



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
    setSearchResults(searchResults.map(i => {
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

  const sorted = [].slice.call(searchResults).sort((a, b) => {
    if (a.id === b.id) { return 0; }
    return a.id > b.id ? 1 : -1;
  });




  useEffect(() => {
    apiClient.get(`${process.env.REACT_APP_SERVER_URL + '/index'}`).then((response) => {
      if (response.status === 200) {
        setState(response.data)

        const newArray = [];
        for (let i = 0; i < response.data.length; i++) {
          if (i < index)
            newArray.push(response.data[i])
        }
        setSearchResults(newArray);
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }, [index]);

  useEffect(() => {
    const results = state.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const newArray = [];
    for (let i = 0; i < results.length; i++) {
      if (i < index)
        newArray.push(results[i])
    }
    setSearchResults(newArray);
  }, [searchTerm]);

  useEffect(() => {
    console.log(searchResults)
    apiClient.post(`${process.env.REACT_APP_SERVER_URL + '/select/update'}`, searchResults).then((response) => {
      if (response.status === 200) {
        console.log('ok')
        console.log(response.data)
        console.log(sorted)
      }
    })
      .catch((err) => {
        console.log(err)
      })

  })



  return (
    <div className='container'>
      <Link to="/">Back</Link>
      <div className="showMore">
        Показывать по:
        <input type='submit' value='5' onClick={() => setIndex(5)} />
        <input type='submit' value='10' onClick={() => setIndex(10)} />
        <input type='submit' value='20' onClick={() => setIndex(20)} />
      </div>
      <div className='selectContainer'>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <input type='submit' value='Выбрать' onClick={onSubmit} />
        <div className='itemContainer'>
          {sorted.map(item => (
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
                <input className='selectInput' type='checkbox' value={item.name} onChange={onChange} />
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={loader}>  Load More </button>
      <div>
        <input type='submit' value='Выбрать' onClick={onSubmit} />
      </div>
    </div>
  )

}


