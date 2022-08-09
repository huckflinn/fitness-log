import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App