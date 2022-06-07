import React, { useContext, useEffect, useState } from "react";
import './App.css';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./context/cart-context";
import AuthContext from "./context/auth-context";
import Login from './components/Login/Login';

function App() {
  const [isCartVisible, setCartVisibility] = useState(false);

  const showCartHandler = () => {
    setCartVisibility(true);
  }
  const hideCartHandler = () => {
    setCartVisibility(false);
  }

  const AuthCtx = useContext(AuthContext);
  
  useEffect(() => {
    if(AuthCtx.displayLoginForm){
      setCartVisibility(false);
    }
  }, [AuthCtx.displayLoginForm]);

  return (
    <React.Fragment>
      {isCartVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <main>
        {!AuthCtx.displayLoginForm && <Meals />}
        {AuthCtx.displayLoginForm && <Login />}
        
      </main>
    </React.Fragment>
  );
}

export default App;
