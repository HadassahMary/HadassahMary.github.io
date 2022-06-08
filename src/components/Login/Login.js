import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import LoginInputField from "./LoginInputField";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [isFromValid, setFormValidity] = useState(false);
  
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FirstName: "",
      Email: "",
      Password: "",
    },
  });

  const onSubmit = (data) => {
    authCtx.onlogin(data.Email);
    setFormValidity(true);
  };

  return (
    <div className={`${classes.login} ${classes.card}`}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${classes.control} ${
            errors.FirstName?.message === "" ? classes.invalid : ""
          }`}
        >
          <input
            type="text"
            placeholder="First Name"
            {...register("FirstName", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "The length should be atleast 5 characters",
              },
            })}
          />
        </div>

        <div
          className={`${classes.control} ${
            errors.Email?.message === "" ? classes.invalid : ""
          }`}
        >
          <p>{errors.FirstName?.message}</p>
          <input
            type="text"
            placeholder="Email"
            {...register("Email", {
              required: "This field is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email.",
              },
              minLength: { value: 5, message: "The email is too short." },
            })}
          />
          <p>{errors.Email?.message}</p>
        </div>
        <div
          className={`${classes.control} ${
            errors.Password?.message === "" ? classes.invalid : ""
          }`}
        >
          <input
            type="password"
            placeholder="Password"
            {...register("Password", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The length should be atleast 4 characters",
              },
            })}
          />
          <p>{errors.Password?.message}</p>
        </div>
        <div className={classes.buttonHolder}>
          <Button type="submit"></Button>
        </div>
      </form>
    </div>
  );
};
export default Login;
