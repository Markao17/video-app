import './App.css'
import Search from './components/Search'
import {useState, useEffect} from 'react'
import ListSection from './components/ListSection';
import TrendingAnimes from './components/TrendingAnimes';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingAnimes } from './supabase-client';

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
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [animeListByPopularity, setAnimeListByPopularity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);


  const fetchAnimeList = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = debouncedSearchTerm.length > 2
        ? `${API_BASE_URL}/anime?filter[text]=${encodeURIComponent(debouncedSearchTerm)}`
      : `${API_BASE_URL}/anime?sort=ratingRank`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch anime');
      }
      const data = await response.json();
      if ( data.Response === 'False' ) {
        setErrorMessage(data.Error || 'Failed to fetch anime');
      }
      setAnimeList(data.data);
      if (animeList.length > 0) {
        console.log(data.data, 'anime list');
        updateSearchCount(debouncedSearchTerm, data.data[0])
      }
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

  const loadTrendingAnimes = async () => {
    try {
      const data = await getTrendingAnimes();
      setTrendingAnimes(data);
    }
    catch (error) {
      setErrorMessage(`Error fetching trending animes: ${error}`);
    }
  }

  useEffect(() => {
    fetchAnimeList();
  },[debouncedSearchTerm])
  
  useEffect(() => {
    fetchAnimePopularity();
    loadTrendingAnimes();
  },[])


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Image" />
          <h1>Find the best <span className="text-gradient">Animes</span> for you.</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingAnimes.length > 0 && (
        <section className="trending">
          <h2>Trending Animes</h2>
          <TrendingAnimes trendingAnimes={trendingAnimes} />
        </section>
        )}
        <ListSection
          title={searchTerm.length > 2 ? "Search Results" : "Top Ranked Animes"}
          sort="ratingRank"
          isLoading={isLoading}
          errorMessage={errorMessage}
          animeList={animeList} />
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
