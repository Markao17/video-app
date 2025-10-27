import React from 'react'

const TrendingAnimes = ({trendingAnimes}) => {
  console.log(trendingAnimes, 'animeList');
  return (
    <ul>
      {trendingAnimes.map((anime, index) => (
        <li key={anime.anime_id}>
          <p>{index + 1}</p>
          <img src={anime.poster_url} alt={anime.anime_id} />
        </li>
      ))}
    </ul>
  )
}

export default TrendingAnimes
