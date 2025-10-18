import './App.css'
import Search from './components/Search'
import {useState} from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          {/* <img src="./logo.png" alt="Logo" className=' max-w-32 mx-auto'/> */}
          <img src="./hero-img.png" alt="Hero Image" />
          <h1>Find the best <span className="text-gradient">Movies</span> for you.</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  )
}

export default App
