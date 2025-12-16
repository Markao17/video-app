import { useState } from 'react';
import AnimeModal from './AnimeModal';

const AnimeCard = ({anime}) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(anime, 'anime');
  const {id, canonicalTitle, posterImage, youtubeVideoId, averageRating, showType, startDate } = anime;
  return (
    <>
    <li className='anime-card' onClick={() => setIsOpen(true)}>
      <img src={posterImage ? posterImage.small : '/no-image.png'} alt={canonicalTitle} />
      <div className="mt-4">
        <h3>{canonicalTitle ? canonicalTitle : 'N/A'}</h3>
        <div className="content">
          <div className="rating">
            <img src="./star.svg" alt="star icon" />
            <p>{averageRating && !isNaN(parseFloat(averageRating)) ? parseFloat(averageRating).toFixed(1) : 'N/A'}</p>
          </div>
          <span>·</span>
          <p className='show-type'>{showType ? showType : 'N/A'}</p>
          <span>·</span>
          <p className='year'>{startDate ? startDate.split('-')[0] : 'N/A'}</p>
          <br />
          {youtubeVideoId && (
            <a className='watch-trailer-link text-gradient' href={`https://www.youtube.com/watch?v=${youtubeVideoId}`} target='_blank' rel='noopener noreferrer'>Watch Trailer</a>
          )}
        </div>
      </div>
    </li>
    <AnimeModal isOpen={isOpen} setIsOpen={setIsOpen} anime={anime} />
    </>
  )
}

export default AnimeCard