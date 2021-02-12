import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useStateValue } from "./StateProvider";
import Profile from "./Profile";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { IconButton } from "@material-ui/core";

function NavBar() {
  const [show, handleShow] = useState(false);
  const [{ location }, dispatch] = useStateValue();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 140) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
  }, []);

  return (
    <>
      <motion.div className={`nav ${show && "scrolled"}`} layout>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finvestormint.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fnetflix-logo-sq.png&f=1&nofb=1"
          alt="Netflix"
          className="nav__logo"
        />
        {location !== "Profile" ? (
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            className="nav__avatar"
            alt=""
            onClick={(e) =>
              dispatch({ type: "SET_LOCATION", location: "Profile" })
            }
          />
        ) : (
          <IconButton className="nav__avatar">
            <CloseRoundedIcon
              className="nav__avatar"
              onClick={(e) =>
                dispatch({ type: "SET_LOCATION", location: "Home" })
              }
            />
          </IconButton>
        )}
      </motion.div>
    </>
  );
}

export default NavBar;
