
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'

const AnimeModal = ({isOpen, setIsOpen, anime}) => {
  const {id, coverImage, favoritesCount, posterImage, ratingRank, youtubeVideoId, startDate, abbreviatedTitles, ageRatingGuide, episodeCount, titles, totalLength, status,canonicalTitle, averageRating, showType, description} = anime;
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10 focus:outline-none">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel transition className="anime-card w-full rounded-xl bg-dark-100/98 p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                  <DialogTitle as="h3" className="text-base/7 font-medium text-white">{canonicalTitle ? canonicalTitle : 'N/A'}</DialogTitle>

                  <div className="content">
                    <div className="rating">
                      <img src="./star.svg" alt="star icon" />
                      <p>{averageRating && !isNaN(parseFloat(averageRating)) ? parseFloat(averageRating).toFixed(1) : 'N/A'}</p>
                      <span>·</span>
                      <p className='show-type'>{showType ? showType : 'N/A'}</p>
                      <span>·</span>
                      <p className='year'>{startDate ? startDate.split('-')[0] : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 max-w-full mt-4">
                    <img src={posterImage ? posterImage.small : '/no-image.png'} alt={canonicalTitle} className="w-full h-full object-cover flex-0" />
                    <iframe src={youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : '/no-video.png'} alt={canonicalTitle} className='w-full h-full object-cover aspect-video flex-1 min-w-0' />
                  </div>
                  <div className="modal-section mt-4 overview">
                    <h4 className="text-lg font-bold text-white">Overview</h4>
                     <p className="text-sm/6 text-white/50">{description ? description : 'N/A'}</p>
                  </div>
                  <div className="modal-section mt-4">
                    <h4 className="text-lg font-bold text-white">Show Type</h4>
                    <p className="text-sm/6 text-white/50">{showType ? showType : 'N/A'}</p>
                  </div>
                  <div className="modal-section mt-4">
                    <h4 className="text-lg font-bold text-white">Status</h4>
                    <p className="text-sm/6 text-white/50">{status ? status : 'N/A'}</p>
                  </div>
                  <div className="modal-section mt-4">
                    <h4 className="text-lg font-bold text-white">Abbreviated Titles</h4>
                    <p className="text-sm/6 text-white/50">{abbreviatedTitles ? abbreviatedTitles.join(', ') : 'N/A'}</p>
                  </div>
                  <div className="modal-section mt-4">
                    <h4 className="text-lg font-bold text-white">Titles</h4>
                    <p className="text-sm/6 text-white/50">{titles ? titles.en_jp || titles.en || titles.ja_jp || titles.ja : 'N/A'}</p>
                  </div>
                  <div className="modal-section mt-4">
                    <h4 className="text-lg font-bold text-white">Favorites Count</h4>
                    <p className="text-sm/6 text-white/50">{favoritesCount ? favoritesCount : 'N/A'}</p>
                  </div>
                  <div className="modal-section mt-4">
                    <h4 className="text-lg font-bold text-white">Rating Rank</h4>
                    <p className="text-sm/6 text-white/50">{ratingRank ? ratingRank : 'N/A'}</p>
                  </div>
            </DialogPanel>
          </div>
        </div>
    </Dialog>
  )
}

export default AnimeModal
