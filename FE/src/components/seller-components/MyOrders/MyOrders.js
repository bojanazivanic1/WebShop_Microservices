import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import classes from "./MyOrders.module.css";
import sellerService from "../../../services/sellerService";
import OrderTable from "../../UI/Table/OrderTable";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      sellerService.getOldOrders().then((res) => {
        if (res != null) {
          setOrders(res);
        }
      });
    }, []);
  
    return (
      <Card className={classes.myOrders}>
        <OrderTable orders={orders} />
      </Card>
    );
};

export default MyOrders;