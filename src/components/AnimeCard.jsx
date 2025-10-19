import React from 'react'

const AnimeCard = ({anime}) => {

  const {id, canonicalTitle, coverImage, description, favoritesCount, posterImage, ratingRank, youtubeVideoId } = anime;
  return (
    <li key={id} className='anime-card text-white p-5 rounded-2xl shadow-inner shadow-light-100/10 bg-[#0F0D23] flex flex-col gap-3'>
      <img src={coverImage.original} alt={canonicalTitle} className='w-full h-auto object-cover rounded-lg aspect-video' />
      <h3>{canonicalTitle}</h3>
      <a href={`https://www.youtube.com/watch?v=${youtubeVideoId}`} target='_blank' rel='noopener noreferrer'>Watch Trailer</a>
      <p className='flex flex-row items-center gap-1'>
        ranking position: <span className='font-bold'>{ratingRank}</span>
      </p>
    </li>
  )
}

export default AnimeCard