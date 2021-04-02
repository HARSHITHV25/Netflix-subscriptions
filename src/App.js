import React, { useLayoutEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Home from "./Home";

function App() {
  const [{ location, user }, dispatch] = useStateValue();
  useLayoutEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "SET_USER", user: user });
        dispatch({ type: "SET_LOCATION", location: "Home" });
      } else {
        dispatch({ type: "SET_LOCATION", location: "Login" });
      }
    });
  }, [user]);
  return (
    <motion.div className="app" layout>
      {location === "Login" ? <Login /> : <Home />}
    </motion.div>
  );
}

export default App;
