import React, { useContext, useState } from "react";
import CartContext from "../../auth-context/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import buyerService from "../../services/buyerService";
import AddOrder from "../buyer-components/AddOrder/AddOrder";

const Cart = (props) => {
    const cartContext = useContext(CartContext);
    const [orderClicked, setorderClicked] = useState(false);
    
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount: 1});
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartContext.items.map(item=>{
                return (
                <CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount} 
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
                )
            })}
        </ul>
    );

    const orderclickedHandler = () => {
        setorderClicked(true);        
    };

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button---alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderclickedHandler}>Order</button>}
                <p>The delivery price is 1 dolar. If you have chosen products from several sellers, the delivery price is 1 dolar for each one.</p>
            </div>
            <div>
                {orderClicked && <AddOrder orderItems={cartContext.items}/>}
            </div>
        </Modal>
    );
};

export default Cart;