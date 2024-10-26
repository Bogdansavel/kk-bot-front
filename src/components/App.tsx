import RegistrationForm from './RegistrationForm'
import Rate from './Rate';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/rate" element={<Rate />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
