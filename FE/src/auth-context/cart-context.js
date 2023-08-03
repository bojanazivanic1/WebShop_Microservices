import React, { useReducer, useState } from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    isShown: false,
    showCart: () => {},
    deleteOnCart: () => {}
});

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmouont = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCardItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCardItem = state.items[existingCardItemIndex];
        let updatedItems;

        if(existingCardItem){
            let updatedItem = {
                ...existingCardItem,
                amount: existingCardItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCardItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
          items: updatedItems,
          totalAmount: updatedTotalAmouont  
        };
    }
    if(action.type === 'REMOVE') {
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCardItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCardItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};

export const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const [isShown, setIsShown] = useState(false);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemToCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const showCartHandler = () => {
        setIsShown(!isShown);
    };

    const deleteOnCart = () => {
        cartState.items = [];
    };

    const temp = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        isShown: isShown,
        showCart: showCartHandler,
        deleteOnCart: deleteOnCart,
    };

    return (
        <CartContext.Provider value={temp}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;