import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import "./App.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  const updateUser = (user) => {
    localStorage.setItem("User", JSON.stringify(user));
    setUser(user);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin updateUser={updateUser} />} />
          <Route
            path="/home"
            element={
              user && user._id ? (
                <Home updateUser={updateUser} />
              ) : (
                <Navigate to="/" updateUser={updateUser} />
              )
            }
          />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
