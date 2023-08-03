import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../auth-context/auth-context";

import Login from "../components/user-components/Login/Login";
import Register from "../components/user-components/Register/Register";
import UpdateUser from "../components/user-components/UpdateUser/UpdateUser";
import Dashboard from "../components/Dashboard/Dashboard";
import AddProduct from "../components/seller-components/AddProduct.js/AddProduct";
import VerifySellers from "../components/admin-components/VerufySellers/VerifySellers";
import NewOrders from "../components/seller-components/NewOrders/NewOrders";
import BuyerNewOrders from "../components/buyer-components/NewOrders/NewOrders";
import MyOrders from "../components/seller-components/MyOrders/MyOrders";
import OldOrders from "../components/buyer-components/OldOrders/OldOrders";
import UpdateProduct from "../components/seller-components/MyProducts/ProductItem/UpdateProduct/UpdateProduct";
import AllUsers from "../components/admin-components/AllUsers/AllUsers";

const AppRouter = () => {
    const context = useContext(AuthContext);

    return (
        <div>
            <Routes>
                <Route path="/" element={context.token ? <Navigate to="/home" /> : <Login />} />
                <Route path="/register" element={context.token ? <Navigate to="/home" /> : <Register />} />
                <Route path="/home" element={context.token ? <Dashboard /> : <Navigate to="/"/>} />       
                <Route path="/update-user" element={context.token ? <UpdateUser /> : <Navigate to="/"/>} />   
                <Route path="/add-product" element={context.token && context.type() === "SELLER" ? <AddProduct /> : <Navigate to="/"/>} />     
                <Route path="/update-product" element={context.token && context.type() === "SELLER" ? <UpdateProduct /> : <Navigate to="/"/>} />         
                <Route path="/verify-sellers" element={context.token && context.type() === "ADMIN" ? <VerifySellers /> : <Navigate to="/"/>} />      
                <Route path="/seller-new-orders" element={context.token && context.type() === "SELLER" ? <NewOrders /> : <Navigate to="/"/>} />      
                <Route path="/seller-my-orders" element={context.token && context.type() === "SELLER" ? <MyOrders /> : <Navigate to="/"/>} />      
                <Route path="/buyer-old-orders" element={context.token && context.type() === "BUYER" ? <OldOrders /> : <Navigate to="/"/>} />      
                <Route path="/buyer-new-orders" element={context.token && context.type() === "BUYER" ? <BuyerNewOrders /> : <Navigate to="/"/>} />    
                <Route path="/all-users" element={context.token && context.type() === "ADMIN" ? <AllUsers /> : <Navigate to="/"/>} />    
            </Routes>
        </div>
    );
};

export default AppRouter;