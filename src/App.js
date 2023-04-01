import React from 'react';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const App = () => {
	const [characters, setCharacters] = useState([]);
	const [filteredCharacters, setFilteredCharacters] = useState([])
	const [query, setQuery] = useState("")
	const [page, setPage] = useState(1);
	const [flag,changeFlag] = useState(1)
	useEffect(() => {
		const fetchData = async () => {
			const temp = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
			const data = await temp.json()
			if(data.results)
			{
				// console.log(query,query==="")
				setCharacters(currentlist => [...currentlist, ...data.results]);
				// setFilteredCharacters(characters.filter(character => character.name.toLowerCase().includes(query.toLowerCase())))
			}
		}

		fetchData()
	}, [page])

	const handlescroll = async () => {
		if (((window.innerHeight + document.documentElement.scrollTop + 10) >= document.documentElement.scrollHeight)) {
			setPage((page) => page + 1);
		}
		// console.log(window.innerHeight,document.documentElement.scrollTop,document.documentElement.scrollHeight)
		// console.log(query, query==="", query===undefined)
	}

	useEffect(() => {
		// console.log(query)
		const newData=characters.filter(character => character.name.toLowerCase().includes(query.toLowerCase()))
		// console.log(newData.length)
		setFilteredCharacters(newData)
		// if (((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight)) {
		// 	console.log(window.innerHeight,document.documentElement.scrollTop,document.documentElement.scrollHeight)
		// 	setPage((page) => page + 1);

		// }
		// console.log("ok", query)
		if(newData.length <= 5&&newData.length >= 1){
			// console.log(filteredCharacters.length)
			setPage((page) => page + 1);

		}
	}, [query, characters])

	// const notFound = () => {
	// 	const len=filteredCharacters.length;
	// 	console.log(len)
	// 	if(len==0)
	// 	return <p>Not Found</p>
	// 	else
	// 	{
	// 	return filteredCharacters.map((character) => (
	// 		<div className="character">
	// 			<LazyLoadImage src={character.image} alt={character.name} effect='blur' />
	// 			<center>{character.name}</center>
	// 			<div className="Status"><small>Status : <em>{character.status}</em></small> </div>
	// 			<div className="Species"><small>Species : <em>{character.species}</em></small> </div>
	// 			<div className="Genger"><small>Gender : <em>{character.gender}</em></small> </div>
	// 		</div>
	// 	))
	// 	}
	// }

	useEffect(() => {
		window.addEventListener('scroll', handlescroll);
		return () => window.removeEventListener('scroll', handlescroll);
	}, [query]);

	return (
		<div className="App">
			<div className="header">
				<h1>Rick & Morty</h1>
				<input type="text" placeholder="search" onChange={(e) => setQuery(e.target.value)
				} />
			</div>
			<div className="results">
				{
					// <notFound></notFound>
					filteredCharacters.map((character) => (
						<div className="character">
							<LazyLoadImage src={character.image} alt={character.name} effect='blur' />
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
