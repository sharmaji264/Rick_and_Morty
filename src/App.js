import React from 'react';
import { useEffect,useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const App = () => {
  const [characters,setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [page, setPage] = useState(1);
  useEffect(() => {
      const fetchData = async () => {
          const temp = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
          const data = await temp.json()
          setCharacters(currentlist => [...currentlist, ...data.results]);
          setFilteredCharacters(currentlist => [...currentlist, ...data.results])
      }

      fetchData()
  },[page])

      const handlescroll = async () => {
        if ((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight ) {
            setPage((page) => page + 1);
        }
    }

    const handleChange = (event) => {
      setFilteredCharacters(characters.filter(character=> character.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }


    useEffect(() => {
        window.addEventListener('scroll', handlescroll);
        return () => window.removeEventListener('scroll', handlescroll);
    }, []);

  return (
    <div className="App">
                  <div className="header">
            <h1>Rick & Morty</h1>
            <input type="text" placeholder="search" onChange={handleChange} /> 
            </div>
      <div className="results">
        {
          filteredCharacters.map((character) => (
            <div className="character">
              <LazyLoadImage src={character.image} alt={character.name} effect='blur'/>
              <center>{character.name}</center>
              <div className="Status"><small>Status : <em>{character.status}</em></small> </div>
              <div className="Species"><small>Species : <em>{character.species}</em></small> </div>
              <div className="Genger"><small>Gender : <em>{character.gender}</em></small> </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
