import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import "./Login.css";
import { Button } from "@material-ui/core";
import Typewriter from "typewriter-effect";
import { auth } from "./firebase";

function Login() {
  const [{ location, user }, dispatch] = useStateValue();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isSignIn, setisSignIn] = useState(false);

  const signIn = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "SET_USER", user: user });
        dispatch({ type: "SET_LOCATION", location: "Home" });
      })
      .catch((e) => alert(e.message));
  };

  const signUp = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({ displayName: username });
        dispatch({ type: "SET_USER", user: user });
        dispatch({ type: "SET_LOCATION", location: "Profile" });
      })
      .catch((e) => alert(e.message));
  };

  const signInchange = (e) => {
    setpassword(e.target.value);
  };

  const signUpchange = (e) => {
    setpassword(e.target.value);
  };

  const screenChange = (e) => {
    setemail("");
    setpassword("");
    setusername("");
    setisSignIn(!isSignIn);
  };

  const screenChange2 = () => {
    setemail("");
    setpassword("");
    setusername("");
    setisSignIn(!isSignIn);
  };

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
          <Button
            variant="contained"
            color="secondary"
            raised
            onClick={screenChange2}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </motion.div>
      </motion.div>
      <motion.div className="login__gradient" />
      <motion.div className="login__content">
        <h1>Unlimited films, TV programmes and more.</h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString("<h2>Made as one. All in one. </h2>").start();
          }}
        />
        <br />
        <br />
        <motion.div className="login__formWrapper" layout>
          {isSignIn ? (
            <motion.div className="login__form">
              <h1>Sign In</h1>
              <div className="">
                <div className="login__email">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="email"
                    id="loginEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="login__password">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    id="loginPassword"
                    placeholder="Password"
                    title={email.length < 5 ? "Please Enter your email." : ""}
                    disabled={email.length < 5 ? true : false}
                    value={password}
                    onChange={signInchange}
                  />
                </div>
              </div>
              <p onClick={screenChange}>Dont have an account? Sign Up</p>
              <div className="login__submit">
                <Button
                  variant="outlined"
                  disabled={password.length === 0 ? true : false}
                  disableElevation={true}
                  disableRipple={true}
                  color="secondary"
                  onClick={signIn}
                >
                  Sign In
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div className="login__form">
              <h1>Sign Up</h1>
              <div className="">
                <div className="login__email">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="email"
                    id="loginEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="login__username">
                  <label htmlFor="loginUsername">Username</label>
                  <input
                    type="text"
                    id="loginUsername"
                    title={email.length < 5 ? "Please Enter your email." : ""}
                    placeholder="Password"
                    disabled={email.length < 5 ? true : false}
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="login__password">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    id="loginPassword"
                    title={
                      username.length === 0 ? "Please Enter your Username." : ""
                    }
                    placeholder="Password"
                    disabled={username.length === 0 ? true : false}
                    value={password}
                    onChange={signUpchange}
                  />
                </div>
              </div>
              <p onClick={screenChange2}>Already have an account? Sign In</p>
              <div className="login__submit">
                <Button
                  variant="outlined"
                  disabled={password.length === 0 ? true : false}
                  disableElevation={true}
                  disableRipple={true}
                  color="secondary"
                  onClick={signUp}
                >
                  Register
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
