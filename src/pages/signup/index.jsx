import { createUserWithEmailAndPassword, auth, db } from "../../config";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import Form from "./Form";
import classes from "./SignUp.module.css";
import { useState } from "react";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [error, setError] = useState({ hasError: false, message: "" });
  const signUpHandler = async (formData) => {
    const { email, password, lastname, firstname } = formData;
    setIsLoading(true);
    setError({ hasError: false, message: "" });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsSuccess(true);
    } catch (error) {
      setError({ hasError: true, message: error.message });
      setTimeout(() => {
        setError({ hasError: false, message: "" });
      }, 3000);
    } finally {
      setIsLoading(false);
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstname: firstname,
        lastname: lastname,
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className={classes.login}>
        <h1 className={classes.h1}>Hello!</h1>
        <Form
          onSubmit={signUpHandler}
          isLoading={isLoading}
          error={error}
          success={success}
        />
        <p className={classes.p}>
          Already have an account?
          <Link to="/login" className={classes.a}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
