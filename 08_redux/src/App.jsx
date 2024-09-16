import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddToto from './components/AddToto'
import SimpleToto from './components/SimpleToto'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddToto />
      <SimpleToto />
    </>
  )
}

export default App
