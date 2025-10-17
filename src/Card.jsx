import React, { useState, useEffect } from 'react'

const Card = ( {title}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    isLiked ? setCount((prev) => prev + 1) : null;
    isLiked ? console.log(`Thank you for liking the movie ${title}`) : null;
  }, [isLiked, title])

  return (
    <div className='bg-gray-800 rounded p-4 text-white flex flex-col items-center justify-center gap-2'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p>{count} people liked this movie</p>
      {isLiked ? <p className='opacity-100 starting:opacity-0 transition-opacity duration-800'>Thank you for liking the movie {title}</p> : null}
      <button onClick={() => setIsLiked(!isLiked)} className='text-2xl'>
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  )
}

export default Card
