import { useContext, useEffect, useState } from "react";
import CartContext from "../../../auth-context/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./NavigationCartButton.module.css";

const NavigationCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext);

    const { items } = cartContext;

    const numberOfCartItems = items.reduce((curNumber, item) => {   //array to number
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
console.log(items)
    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default NavigationCartButton;