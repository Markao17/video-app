import React from 'react'
import { BarLoader } from 'react-spinners';
import AnimeCard from './AnimeCard';

const ListSection = ({title, isLoading, errorMessage, animeList}) => {
  return (
    <section>
        <h2 className='mt-10 mb-6'>{title}</h2>
        {isLoading ? (
        <div className="flex justify-center items-center my-4">
            <BarLoader color="#fff" />
        </div>
        ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
        ) : (
        <ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {animeList.map(anime => {
            console.log(anime.attributes);
            return (
                <AnimeCard anime={anime.attributes} />
            )
            })}
        </ul>
        )}
    </section>
  )
}

export default ListSection
