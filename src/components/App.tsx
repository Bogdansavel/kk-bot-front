import Rate from './Rate';
import RegisteredMembers from './RegisteredMembers';
import Events from './Events/Events';
import { Routes, Route } from "react-router-dom";
import Rates from './Rates';
import Wrapped from './Wrapped';

function App() {
  return (
    <div className='pb-10'>
      <Routes>
          <Route path="/rate/:movieId" element={<Rate />} />
          <Route path="/rates/:movieId" element={<Rates />} />
          <Route path="/movies" element={<Events />} />
          <Route path="/members" element={<RegisteredMembers />} />
          <Route path="/wrapped" element={<Wrapped />} />
      </Routes>
    </div>
  )
}

export default App
