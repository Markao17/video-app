import React from 'react'

const AnimeCard = ({anime}) => {

  const {id, canonicalTitle, coverImage, description, favoritesCount, posterImage, ratingRank, youtubeVideoId, averageRating, showType, startDate } = anime;
  return (
    <li className='anime-card'>
      <img src={posterImage ? posterImage.small : '/no-image.png'} alt={canonicalTitle} />
      <div className="mt-4">
        <h3>{canonicalTitle}</h3>
        <div className="content">
          <div className="rating">
            <img src="./star.svg" alt="star icon" />
            <p>{averageRating && !isNaN(parseFloat(averageRating)) ? parseFloat(averageRating).toFixed(1) : 'N/A'}</p>
          </div>
          <span>·</span>
          <p className='show-type'>{showType}</p>
          <span>·</span>
          <p className='year'>{startDate ? startDate.split('-')[0] : 'N/A'}</p>
          <br />
          {youtubeVideoId && (
            <a className='watch-trailer-link text-gradient' href={`https://www.youtube.com/watch?v=${youtubeVideoId}`} target='_blank' rel='noopener noreferrer'>Watch Trailer</a>
          )}
        </div>
      </div>
    </li>
  )
}

export default AnimeCard