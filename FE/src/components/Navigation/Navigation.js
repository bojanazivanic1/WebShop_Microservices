import React, { useContext } from "react";
import classes from "./Navigation.module.css";
import AuthContext from "../../auth-context/auth-context";
import Button from "../UI/Button/Button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import NavigationCartButton from "./CartButton/NavigationCartButton";
import CartContext from "../../auth-context/cart-context";

const Navigation = (props) => {
    const authContext = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        authContext.onLogout();
    };

    return (
        <nav className={classes.nav}>
            <ul>
                {authContext.token && authContext.type() === "BUYER" && location.pathname === "/home" && (
                <li>
                    <NavigationCartButton onClick={cartContext.showCart}/>
                </li>
                )}
                {authContext.token && location.pathname !== "/home" && (
                <li>
                    <Link to="/home" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Home
                        </Button>
                    </Link>
                </li>
                )}
                {authContext.token && (
                <li>
                    <Button className={classes.btn} disabled={false} onClick={handleLogout}>
                        Log Out
                    </Button>
                </li>
                )}
            </ul>

        </nav>
    );
};

export default Navigation;