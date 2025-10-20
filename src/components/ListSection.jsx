import React from 'react'
import { BarLoader } from 'react-spinners';
import AnimeCard from './AnimeCard';

const ListSection = ({title, isLoading, errorMessage, animeList}) => {
  return (
    <section className='all-animes'>
        <h2 className='mt-10 mb-6'>{title}</h2>
        {isLoading ? (
        <div className="flex justify-center items-center my-4">
            <BarLoader color="#fff" />
        </div>
        ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
        ) : (
        <ul>
            {animeList.map(anime => {
            return (
                <AnimeCard key={anime.id} anime={anime.attributes} />
            )
            })}
        </ul>
        )}
    </section>
  )
}

export default ListSection
