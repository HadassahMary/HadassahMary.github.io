import React, { useContext } from "react";
import HeaderCartButton from "./HeaderCartButton";
import headerImage from "../../assets/HeaderImg.jpg";
import classes from "./Header.module.css";
import UserLogButton from "./UserLogButton";
import AuthContext from "../../context/auth-context";

const Header = (props) => {
  const AuthCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <div className={classes.buttonHolder}>
          {!AuthCtx.isLoggedIn && (
            <UserLogButton name="Login" onClick={AuthCtx.loginFormVisibile} />
          )}
          {AuthCtx.isLoggedIn && (
            <UserLogButton name="Logout" onClick={AuthCtx.logout} />
          )}
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={headerImage} alt="Drawings of food" />
      </div>
    </React.Fragment>
  );
};
export default Header;
