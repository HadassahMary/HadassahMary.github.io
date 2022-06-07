import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  onlogin: (email) => {},
  logout: () => {},
  displayLoginForm: false,
  loginFormVisibile: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setEmailID] = useState("");
  const [loginForm, setLoginFormVisibility] = useState(false);

  useEffect(() => {
    const checkLog = localStorage.getItem("loggedInUser");
    if (checkLog === "1") {
      setLoggedIn(true);
    }
  }, []);

  const changeLoginFormVisibility = () => {
    if (loginForm) {
      setLoginFormVisibility(false);
    } else {
      setLoginFormVisibility(true);
    }
  };

  const loginHandler = (email) => {
    setEmailID(email);
    setLoggedIn(true);
    setLoginFormVisibility(false);
    localStorage.setItem("loggedInUser", "1");
    
  };
  const logHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: userEmail,
        onlogin: loginHandler,
        logout: logHandler,
        displayLoginForm: loginForm,
        loginFormVisibile: changeLoginFormVisibility,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
