import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login  from "./pages/Login";
import Notes  from "./pages/Notes";

// This file sets up all the routes (pages) of the app
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / → Login page */}
        <Route path="/"       element={<Login />} />

        {/* /signup → Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* /notes → Notes page */}
        <Route path="/notes"  element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
