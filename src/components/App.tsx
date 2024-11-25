import RegistrationForm from './RegistrationForm'
import Rate from './Rate';
import RegisteredMembers from './RegisteredMembers';
import { Routes, Route } from "react-router-dom";
import Rates from './Rates';

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/rate/:movieId" element={<Rate />} />
      <Route path="/rates/:movieId" element={<Rates />} />
      <Route path="/members" element={<RegisteredMembers />} />
    </Routes>
  )
}

export default App
