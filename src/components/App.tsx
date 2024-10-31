import RegistrationForm from './RegistrationForm'
import Rate from './Rate';
import RegisteredMembers from './RegisteredMembers';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/members" element={<RegisteredMembers />} />
        </Routes>
    </>
  )
}

export default App
