import './App.css'
import Search from './components/Search'
import {useState, useEffect} from 'react'
import ListSection from './components/ListSection';

const API_BASE_URL = 'https://kitsu.io/api/edge';
const API_TOKEN = import.meta.env.VITE_KITSU_ACCESS_TOKEN;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${API_TOKEN}`,
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [animeListByRank, setAnimeListByRank] = useState([]);
  const [animeListByPopularity, setAnimeListByPopularity] = useState([]);
  const [animeSearchResults, setAnimeSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnimeRanked = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = `${API_BASE_URL}/anime?sort=ratingRank`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch anime');
      }
      const data = await response.json();
      if ( data.Response === 'False' ) {
        setErrorMessage(data.Error || 'Failed to fetch anime');
        setAnimeListByRank([]);
        setIsLoading(false);
        return;
      }
      setAnimeListByRank(data.data);
    }
    catch (error) {
      console.log(`Error fetching anime: ${error}`);
      setErrorMessage(`Error fetching anime: ${error}`);
    }
    finally {
      setIsLoading(false);
    }
  }

  const fetchAnimePopularity = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = `${API_BASE_URL}/anime?sort=popularityRank`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch anime');
      }
      const data = await response.json();
      if ( data.Response === 'False' ) {
        setErrorMessage(data.Error || 'Failed to fetch anime');
        setAnimeListByPopularity([]);
        setIsLoading(false);
        return;
      }
      setAnimeListByPopularity(data.data);
    }
    catch (error) {
      console.log(`Error fetching anime: ${error}`);
      setErrorMessage(`Error fetching anime: ${error}`);
    }
    finally {
      setIsLoading(false);
    }
  }

  const fetchSearchResults = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = `${API_BASE_URL}/anime?filter[text]=${searchTerm}`;
      const response = await fetch(endpoint, API_OPTIONS);
      console.log(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch anime');
      }
      const data = await response.json();
      if ( data.Response === 'False' ) {
        setErrorMessage(data.Error || 'Failed to fetch anime');
        setAnimeSearchResults([]);
        setIsLoading(false);
        return;
      }
      setAnimeSearchResults(data.data);
    }
    catch (error) {
      console.log(`Error fetching anime: ${error}`);
      setErrorMessage(`Error fetching anime: ${error}`);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAnimeRanked();
    fetchAnimePopularity();
  },[])

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchSearchResults();
    }

    console.log(animeSearchResults);
  }, [searchTerm])


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          {/* <img src="./logo.png" alt="Logo" className=' max-w-32 mx-auto'/> */}
          <img src="./hero-img.png" alt="Hero Image" />
          <h1>Find the best <span className="text-gradient">Animes</span> for you.</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ListSection
            title="Search Results"
            sort="searchResults"
            isLoading={isLoading}
            errorMessage={errorMessage}
            animeList={animeSearchResults}
          />
        </header>
        <ListSection
          title="Top Ranked Animes"
          sort="ratingRank"
          isLoading={isLoading}
          errorMessage={errorMessage}
          animeList={animeListByRank}
        />
        <ListSection
          title="Animes by Popularity"
          sort="popularityRank"
          isLoading={isLoading}
          errorMessage={errorMessage}
          animeList={animeListByPopularity}
        />
      </div>
    </main>
  )
}

export default App
