import { motion } from "framer-motion";
import React from "react";
import "./Plans.css";
import { useStateValue } from "./StateProvider";

function Plans({ plan, description, price, image, idName }) {
  const [{ location }, dispatch] = useStateValue();
  const payment = async () => {
    dispatch({
      type: "SET_PLAN",
      plan: plan,
    });
    dispatch({
      type: "SET_PRICE",
      price: price,
    });
    dispatch({
      type: "SET_DESCRIPTION",
      description: description,
    });
    dispatch({
      type: "SET_IMAGE",
      image: image,
    });
    dispatch({
      type: "SET_LOCATION",
      location: "Payment",
    });
  };
  return (
    <motion.div className="plans" layout>
      <motion.div className="plans__card" id={idName} onClick={payment} layout>
        <h3 className="plans__plan">{plan}</h3>
        <h5 className="plans__price">
          ₹{price}
          {price === 10500 ? "/year" : "/month"}
        </h5>
        <p className="plans__description">{description}</p>
      </motion.div>
    </motion.div>
  );
}

export default Plans;
