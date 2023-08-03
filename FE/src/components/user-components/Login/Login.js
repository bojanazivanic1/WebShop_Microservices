import React, { useState, useContext } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../auth-context/auth-context";
import classes from "./Login.module.css";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authContext = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 2
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredEmail.trim().length > 2 
    );
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 2);
  };

  const googleLoginHandler = async (event) => {
    try{
      await authContext.googleLogin({token: event.credential})
    }
    catch(ex) {
      alert(ex.response.data);
    }
    ;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try{
      await authContext.onLogin({email: enteredEmail, password: enteredPassword});
      navigate("/");
    }
    catch(ex) {
      
    }
  };

  return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
        </form>
        <div className={classes.control}>
          <p>Don't have an account? <Link to={"/register"} className={classes.link}>Register</Link></p>
        </div>
        <div className={classes.googleLogin}>
          <GoogleLogin onSuccess={googleLoginHandler} onError={e => alert("Failed.")} />
        </div>
      </Card>
  );
};

export default Login;