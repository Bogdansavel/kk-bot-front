import RegistrationForm from './RegistrationForm'
import Rate from './Rate';
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/rate" element={<Rate />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
