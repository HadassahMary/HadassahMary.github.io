import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import classes from "./Login.module.css";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import LoginInputField from "./LoginInputField";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  } else if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.length > 3 };
  } else if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.length > 3 };
  }
  return { value: "", isValid: null };
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailState, handleEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, handlePassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [isFromValid, setFormValidity] = useState(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      const check = emailState.isValid && passwordState.isValid;

      if (check) {
        setFormValidity(true);
      } else {
        setFormValidity(false);
      }
    }, 500);

    return () => {
      clearTimeout(interval);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    handleEmail({ type: "USER_INPUT", value: event.target.value });
  };
  const isEmailValid = () => {
    handleEmail({ type: "USER_BLUR" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authCtx.onlogin(emailRef.current.value);
  };
  const passwordChangeHandler = (event) => {
    handlePassword({ type: "USER_INPUT", value: event.target.value });
  };
  const isPasswordValid = () => {
    handlePassword({ type: "USER_BLUR" });
  };
  

  return (
    <div className={`${classes.login} ${classes.card}`} >
        <h2>Login Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <LoginInputField
            label="Email"
            type="email"
            onChange={emailChangeHandler}
            onBlur={isEmailValid}
            value={emailState.value}
            passref={emailRef}
          />
        </div>
        {emailState.isValid===false && <p>Should contain '@'.</p>}
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <LoginInputField
            label="Password"
            type="password"
            onChange={passwordChangeHandler}
            onBlur={isPasswordValid}
            value={passwordState.value}
            passref={passwordRef}
          />
        </div>
        {passwordState.isValid===false && <p>Length should be more than 3.</p>}
        <Button type="submit" disabled={!isFromValid}></Button>
      </form>
    </div>
  );
};
export default Login;
