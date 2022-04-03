/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */


import { Link } from "react-router-dom";
import Loading from './Loading';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Select() {
  const [checked, setChecked] = useState([]);
  const [state, setState] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [index, setIndex] = useState(5)

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
        <Loading state={searchResults} onChange={onChange} />
      </div>
      <button onClick={loader}>  Load More </button>
      <div>
        <input type='submit' value='Выбрать' onClick={onSubmit} />
      </div>
    </div>
  )

}


