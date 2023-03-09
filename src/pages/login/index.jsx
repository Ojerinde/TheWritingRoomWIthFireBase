import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../config";
import { AppContext } from "../../store/AppContext";

import Form from "./Form";
import classes from "./Login.module.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ hasError: false, message: "" });
  const navigate = useNavigate();
  const { updateLoggedInState } = useContext(AppContext);
  const signInHandler = async (formData) => {
    const { email, password } = formData;
    setIsLoading(true);
    setError({ hasError: false, message: "" });
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await updateLoggedInState((prev) => ({
        isLoggedIn: true,
        email: user.email,
      }));
      navigate("/posts");
    } catch (error) {
      setError({ hasError: true, message: error.message });
      setTimeout(() => {
        setError({ hasError: false, message: "" });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={classes.login} data-testid="login__page">
        <h1 className={classes.h1}>Welcome back!</h1>
        <Form onSubmit={signInHandler} error={error} isLoading={isLoading} />

        <p className={classes.p}>
          Do not have an account?
          <Link to="/signup" className={classes.a}>
            Create now
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
