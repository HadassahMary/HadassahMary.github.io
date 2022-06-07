import React from "react";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        console.log(state.items);
        console.log(action.item);
        let updatedItems;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        
        if(existingCartItemIndex > -1){
            state.items[existingCartItemIndex].amount += action.item.amount;
            updatedItems = state.items;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    else if(action.type === 'REMOVE'){
        let updatedItems;
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        if(state.items[existingCartItemIndex].amount > 1){
            state.items[existingCartItemIndex].amount -= 1;
            updatedItems = state.items;
        }
        else if(state.items[existingCartItemIndex].amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id); //Keeps all the items whose id is not equal to the remove id

        }
        const updatedTotalAmount = state.totalAmount - state.items[existingCartItemIndex].price;
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        
        
    }
    return defaultCartState;
}

const CartContext = React.createContext({
    items: [],
    totalAomount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});
export const CartContextProvider = (props) => {

    const [cartState, updateCart] = useReducer(cartReducer, defaultCartState)
    const addItemToCart = item => {
        updateCart({type: 'ADD', item:item});

    }
    const removeItemFromCart = id => {
        updateCart({type: 'REMOVE', id: id})
        
    }
    

    return <CartContext.Provider value={{items: cartState.items, totalAmount: cartState.totalAmount, addItem: addItemToCart, removeItem:removeItemFromCart}}>{props.children}</CartContext.Provider>
}
export default CartContext;