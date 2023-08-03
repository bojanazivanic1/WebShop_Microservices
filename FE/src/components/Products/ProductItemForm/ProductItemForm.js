import React, { useRef, useState } from "react";
import classes from "./ProductItemForm.module.css";

const ProductItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = +amountInputRef.current.value;
        if(enteredAmount < 1) {
                setAmountIsValid(false);
                return;
            }
        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.input}>
                <div className={classes.row}>
                    <label htmlFor="amount">Amount</label>
                    <input 
                        ref={amountInputRef}
                        id="amount"
                        type="number"
                        min={1}
                        step={1}
                        defaultValue={1}
                    />
                </div>
                <button>+ Add</button>
                {!amountIsValid && <p>Please enter a valid amount.</p>}
            </div>
        </form>
    );
};

export default ProductItemForm;