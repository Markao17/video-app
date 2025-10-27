import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <>
      <div className='search text-white text-3xl'>
          <div>
              <img src="./search.svg" alt="search icon" />
              <input
                  type="text"
                  placeholder="Search for an anime"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value)}}
              />
          </div>
      </div>
      {searchTerm.length > 2 ? (
        <p className='text-white text-sm'>you searched for: <span className='text-gradient'>{searchTerm}</span></p>
      ) : (
        <p className='text-white text-sm'>Please enter at least 3 characters to search for an anime</p>
      )}
    </>
  )
}

export default Search