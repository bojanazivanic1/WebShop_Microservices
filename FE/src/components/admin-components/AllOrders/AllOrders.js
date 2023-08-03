import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import adminService from "../../../services/adminService";
import OrderTable from "../../UI/Table/OrderTable";
import classes from "./AllOrders.module.css";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      adminService.getAllOrders().then((res) => {
        if (res != null) {
          setOrders(res);
        }
      });
    }, []);
  
    return (
      <Card className={classes.orders}>
        <OrderTable orders={orders} />
      </Card>
    );
  };
export default AllOrders;