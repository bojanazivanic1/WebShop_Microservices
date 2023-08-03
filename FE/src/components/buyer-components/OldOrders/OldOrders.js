import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import buyerService from "../../../services/buyerService";
import OrderTable from "../../UI/Table/OrderTable";
import classes from "./OldOrders.module.css";

const BuyerOldOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    buyerService.getOldOrders().then((res) => {
      if (res != null) {
        setOrders(res);
      }
    });
  }, []);

  return (
    <Card className={classes.buyerOldOrdersCard}>
      <OrderTable orders={orders} />
    </Card>
  );
};

export default BuyerOldOrders;