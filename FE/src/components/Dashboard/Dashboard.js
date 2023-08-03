import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import classes from "./Dashboard.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import AllOrders from "../admin-components/AllOrders/AllOrders";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import CartContext from "../../auth-context/cart-context";
import MyProducts from "../seller-components/MyProducts/MyProducts";

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const cartContext = useContext(CartContext);

    const hideCartHandler = () => {
        cartContext.showCart();
    };

    return (
        <>
            {authContext.type() === "ADMIN" && (
                <>
                <Card className={classes.dashboard}>
                    <Link to="/update-user" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Update Profile
                        </Button>
                    </Link>
                    <Link to="/verify-sellers" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Verify Sellers
                        </Button>
                    </Link>
                    <Link to="/all-users" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            All Users
                        </Button>
                    </Link>
                </Card>
                <AllOrders />
                </>
            )}
            
            {authContext.type() === "SELLER" && (
                <>                
                <Card className={classes.dashboard}>
                    <Link to="/update-user" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Update Profile
                        </Button>
                    </Link>
                    <Link to="/add-product" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Add Product
                        </Button>
                    </Link>
                    <Link to="/seller-new-orders" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            New Orders
                        </Button>
                    </Link>
                    <Link to="/seller-my-orders" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            My Orders
                        </Button>
                    </Link>
                </Card>   
                <MyProducts />
                </>
            )}
            
            {authContext.type() === "BUYER" && (
                <>        
                {cartContext.isShown && <Cart onClose={hideCartHandler}/>}      
                <Card className={classes.dashboard}>
                    <Link to="/update-user" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Update Profile
                        </Button>
                    </Link>
                    <Link to="/buyer-new-orders" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            New Orders
                        </Button>
                    </Link>
                    <Link to="/buyer-old-orders" className={classes.link}>
                        <Button className={classes.btn} disabled={false}>
                            Old Orders
                        </Button>
                    </Link>
                </Card>       
                <Products />
                </>
            )}
        </>
    );
};

export default Dashboard;