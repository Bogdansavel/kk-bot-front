import RegistrationForm from './RegistrationForm'
import Rate from './Rate';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/rate" element={<Rate />} />
        </Routes>
    </>
  )
}

export default App
