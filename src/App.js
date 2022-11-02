import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoMatch from "./Components/NoMatch/NoMatch";
import Register from "./Components/Register/Register";
import { useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/Register" />} />
          <Route path="/Register" element={isLoggedIn ? <Navigate to="/home" /> : <Register />} />
          {isLoggedIn && <>
            <Route exact path="/home" element={<Home />} />
          </>}

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;