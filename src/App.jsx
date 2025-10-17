import './App.css'
import Card from './Card'

function App() {

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Movies</h1>
      <div className='grid gap-2 grid-cols-3'>
        <Card title="The Dark Knight" />
        <Card title="Star Wars" />
        <Card title="The Lord of the Rings" />
      </div>
    </div>
  )
}

export default App
