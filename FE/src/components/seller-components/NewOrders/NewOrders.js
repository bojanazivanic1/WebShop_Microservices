import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import classes from "./NewOrders.module.css";
import sellerService from "../../../services/sellerService";
import OrderTable from "../../UI/Table/OrderTable";
import { formatDateTime } from "../../../helpers/helpers";

const NewOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      sellerService.getNewOrders().then((res) => {
        if (res != null) {
          setOrders(res);
        }
      });
    }, []);
  
    const calculateTimeLeft = (deliveryTime) => {
      const difference = new Date(deliveryTime) - new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    useEffect(() => {
      const timer = setInterval(() => {
        setOrders((prevOrders) => {
          return prevOrders.map((order) => {
            const updatedTimeLeft = calculateTimeLeft(order.deliveryTime);
            return {
              ...order,
              timeLeft: updatedTimeLeft,
            };
          });
        });
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Card className={classes.newOrdersCard}>
        {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Delivery Address</th>
              <th>Comment</th>
              <th>Order Time</th>
              <th>Delivery Time</th>
              <th>Time Left</th>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const timeLeft = calculateTimeLeft(order.deliveryTime);

              return (
                <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.comment}</td>
                <td>{formatDateTime(order.orderTime)}</td>
                <td>{formatDateTime(order.deliveryTime)}</td>
                <td>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                    {timeLeft.seconds}s
                </td>
                <td>
                  {order.orderItems.map((item) => (
                    <span>
                      {item.name} x {item.amount}
                      <br />
                    </span>
                  ))}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No orders to view.</p>
      )}
    </Card>
    );
  };

export default NewOrders;