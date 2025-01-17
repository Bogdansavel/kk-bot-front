import Rate from './Rate';
import RegisteredMembers from './RegisteredMembers';
import Movies from './Movies';
import { Routes, Route } from "react-router-dom";
import Rates from './Rates';
import Wrapped from './Wrapped';

function App() {
  return (
    <Routes>
      <Route path="/rate/:movieId" element={<Rate />} />
      <Route path="/rates/:movieId" element={<Rates />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/members" element={<RegisteredMembers />} />
      <Route path="/wrapped" element={<Wrapped />} />
    </Routes>
  )
}

export default App
