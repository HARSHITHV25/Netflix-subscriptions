import { motion } from "framer-motion";
import React from "react";
import "./Profile.css";
import "./NavBar.css";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";

function Profile() {
  const [{ location }, dispatch] = useStateValue();
  return (
    <>
      {location === "Profile" && (
        <motion.div className="profile" layout>
          <h2>Profile</h2>
          <motion.div className="profile__username" layout>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={"Harshith"}
            />
          </motion.div>
          <motion.div className="profile__password" layout>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={"SomethingLol"}
            />
          </motion.div>
          <motion.div className="profile__submit" layout>
            <Button variant="contained" color="secondary">
              Save
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Profile;
