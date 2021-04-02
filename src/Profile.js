import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./NavBar.css";
import "./Payment.css";
import { Avatar, Button } from "@material-ui/core";
import Plans from "./Plans";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import moment from "moment";
import { Description } from "@material-ui/icons";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const CheckoutForm = ({ planPrice, user, plan, description }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [billingDetails, setBillingDetails] = useState({
    email: user.email,
    phone: "",
    name: user.displayName,
  });

  useEffect(() => {
    const getClientSecret = async () => {
      await fetch(
        `https://netflix-norms.herokuapp.com/payments/create?total=${
          planPrice * 100
        }`,
        { method: "POST" }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    };
    return getClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    if (error) {
      elements.getElement("card").focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        },
      })
      .then((payload) => {
        if (payload.error) {
          setError(payload.error);
        } else {
          db.collection("entities").doc(user.uid).set({
            username: user.displayName,
            email: user.email,
            plan: plan,
            phone: billingDetails.phone,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            description: description,
            price: planPrice,
          });
          setPaymentDone(true);
        }
      });
  };

  return paymentDone ? (
    <div className="Result">
      <div className="ResultTitle">
        A Payment of ₹{planPrice} was successful.{" "}
        <img
          src="./check-circle.gif"
          style={{ maxHeight: "40px", maxWidth: "40px" }}
          alt=""
        />
      </div>
      <div className="ResultMessage">
        Enjoy your <b>{plan}</b> plan now!.
      </div>
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Charles Vincent"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="charlesvin@yahoo.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Subscribe by paying ₹{planPrice}
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const stripePromise = loadStripe(
  "pk_test_51HRuezHkbzSCimCfF9uWchSOCg7HdqwtHE99QVMZtZxoM3hfO6kaWWUXosglpuH9wX3rdmc1K41s3oU9cC1yw00p00S3qYwwcb"
);

function Profile() {
  const [
    { location, user, price, plan, description, image },
    dispatch,
  ] = useStateValue();
  const [username, setusername] = useState(user.displayName);
  const [edit, setedit] = useState(false);
  const [timeleft, setTimeleft] = useState(null);
  const [userDetails, setUserDetails] = useState({ id: null, data: null });

  useEffect(() => {
    db.collection("entities")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setUserDetails({ id: snapshot.id, data: snapshot.data() });
          setTimeleft(
            Math.floor(
              (new Date().getTime() -
                new Date(snapshot?.data()?.timestamp?.toDate()).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          );
        } else {
          return;
        }
      });
  }, []);

  const edited = (e) => {
    setedit(false);
    if (username !== user.displayName) {
      setedit(true);
    }
    setusername(e.target.value);
  };

  return (
    <>
      {location === "Profile" ? (
        <motion.div className="profile" layout>
          <motion.div className="profile__user" layout>
            <Avatar src="./user-image-red.png" className="profile__image" />
            <h2>Profile</h2>
            <motion.div className="profile__username" layout>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={edited}
              />
            </motion.div>
            {edit && (
              <>
                <motion.div className="profile__password" layout>
                  <label htmlFor="password">Password: </label>
                  <input type="text" id="password" placeholder="Password" />
                </motion.div>
                <motion.div className="profile__submit" layout>
                  <Button variant="contained" color="secondary">
                    Save
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
          {userDetails.data === null ? (
            <>
              <motion.div className="profile__plans">
                <Plans
                  plan="Basic"
                  description="You can screen share with maximum of 1 device at a time, and you can watch unlimited movies"
                  price={700}
                  idName="plans-basic"
                  image="./user-image.png"
                />
                <Plans
                  plan="Standard"
                  description="HD video streaming!, You can screen share with maximum of 2 devices at a time"
                  price={1050}
                  idName="plans-standard"
                  image="./user-image-green.jpg"
                />
                <Plans
                  plan="Premium Suitē"
                  description="You can screen share with maximum of 5 devices at a time and can have downloads on 4 different devices"
                  price={10500}
                  idName="plans-premium"
                  image="./user-image-red.png"
                />
              </motion.div>
            </>
          ) : (
            <motion.div className="profile__plans">
              <motion.div className="proflie__planTitle">
                {userDetails.data.plan}
              </motion.div>
              <motion.div className="profile__planCost">
                {userDetails.data.price}
              </motion.div>
              <motion.div className="profile__planDescription">
                {userDetails.data.description}
              </motion.div>
              <motion.div className="profile__planOn">
                {moment
                  .unix(userDetails.data.timestamp)
                  .format("MMMM Do, h:mma")}
              </motion.div>
              <motion.div className="profile__planTimeleft">
                {31 - timeleft} days left
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      ) : (
        location === "Payment" && (
          <motion.div className="payment" layout>
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <motion.div className="payment__container" layout>
                <motion.div className="payment__content" layout>
                  <h1 className="payment__plan">{plan}</h1>
                  <img className="payment__image" src={image} alt="" />
                  <p className="payment__description">{description}</p>
                </motion.div>
                <CheckoutForm
                  planPrice={price}
                  user={user}
                  plan={plan}
                  description={description}
                />
              </motion.div>
            </Elements>
          </motion.div>
        )
      )}
    </>
  );
}

export default Profile;
