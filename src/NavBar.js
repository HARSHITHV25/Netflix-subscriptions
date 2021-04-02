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

  const handleClick = () => {
    console.log("dispatching.....");
    dispatch({
      type: "SET_PLAN",
      plan: null,
    });
    dispatch({
      type: "SET_PRICE",
      price: null,
    });
    dispatch({
      type: "SET_DESCRIPTION",
      description: null,
    });
    dispatch({
      type: "SET_IMAGE",
      image: null,
    });
    dispatch({ type: "SET_LOCATION", location: "Profile" });
  };

  return (
    <>
      <motion.div className={`nav ${show && "scrolled"}`} layout>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finvestormint.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fnetflix-logo-sq.png&f=1&nofb=1"
          alt="Netflix"
          className="nav__logo"
        />
        {location === "Profile" ? (
          <IconButton className="nav__avatar">
            <CloseRoundedIcon
              className="nav__avatar"
              onClick={(e) =>
                dispatch({ type: "SET_LOCATION", location: "Home" })
              }
            />
          </IconButton>
        ) : location === "Payment" ? (
          <>
            <IconButton className="nav__avatar">
              <CloseRoundedIcon
                className="nav__avatar"
                onClick={(e) => {
                  window.location.reload(false);
                }}
              />
            </IconButton>
          </>
        ) : (
          <img
            src={`./user-image-red.png` || `./user-image-green.jpg`}
            className="nav__avatar"
            alt=""
            onClick={handleClick}
          />
        )}
      </motion.div>
    </>
  );
}

export default NavBar;
