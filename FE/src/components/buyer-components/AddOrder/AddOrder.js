import React, { useContext, useState } from "react";
import buyerService from "../../../services/buyerService";
import { useNavigate } from "react-router-dom";
import classes from "./AddOrder.module.css";
import Button from "../../UI/Button/Button";
import CartContext from "../../../auth-context/cart-context";

const AddOrder = (props) => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);
    const [enteredAddress, setEnteredAddress] = useState('');
    const [addressIsValid, setAddressIsValid] = useState();
    const [enteredComment, setEnteredComment] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    const addressChangeHandler = (event) => {
        setEnteredAddress(event.target.value);
    
        setFormIsValid(event.target.value.trim().length > 5);
    };

    const validateAddressHandler = () => {
        setAddressIsValid(enteredAddress.trim().length > 5);
    };
    
    const commentChangeHandler = (event) => {
        setEnteredComment(event.target.value);
    };    

    const submitHandler = (event) => {
        event.preventDefault();
        
        const orderItems = props.orderItems.map(item => {
            return {
                productId : item.id,
                amount : item.amount
            }
        })

        const order = {
            "deliveryAddress": enteredAddress,
            "comment": enteredComment,
            "orderItems": orderItems
        }

        buyerService.addOrder(order)
            .then(res => {alert("Successfully ordered!"); 
                            cartContext.deleteOnCart();
                            cartContext.isShown = false;
                            cartContext.showCart();
                             })
            .catch(e => { console.log(e); return; });

    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className={`${classes.control} ${
                    addressIsValid === false ? classes.invalid : ''
                }`}>
                <label htmlFor="address">Delivery Address</label>
                <input
                type="text"
                id="address"
                value={enteredAddress}
                onChange={addressChangeHandler}
                onBlur={validateAddressHandler}
                />
                </div>
                <div className={classes.control}>
                    <label htmlFor="comment">Comment</label>
                    <input
                    type="text"
                    id="comment"
                    value={enteredComment}
                    onChange={commentChangeHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Final Order
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddOrder;