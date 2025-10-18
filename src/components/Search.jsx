import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search text-white text-3xl'>
        <div>
            <img src="./search.svg" alt="search icon" />
            <input
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)}}
            />
        </div>
        <p>you searched for: {searchTerm}</p>
    </div>
  )
}

export default Search