import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./Login.css";
import { Button } from "@material-ui/core";
import Typewriter from "typewriter-effect";

function Login() {
  const [{ location }, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: "SET_LOCATION",
      location: "Login",
    });
  }, []);
  return (
    <motion.div className="login">
      <motion.div className="login__nav">
        <motion.div className="login__logo">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
        </motion.div>
        <motion.div className="login__button">
          <Button variant="contained" color="secondary" raised>
            Sign In
          </Button>
        </motion.div>
      </motion.div>
      <motion.div className="login__gradient" />
      <motion.div className="login__content">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("<h1>Unlimited films, TV programmes and more.</h1>")
              .pauseFor(1000)
              .typeString("<h2>Made as one. All in one. </h2>")
              .start();
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Login;
