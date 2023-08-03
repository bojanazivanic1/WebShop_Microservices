import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import buyerService from "../../../services/buyerService";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import classes from "./NewOrders.module.css";
import { formatDateTime } from "../../../helpers/helpers";

const BuyerNewOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    buyerService.getNewOrders().then((res) => {
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
    <Card className={classes.buyerNewOrdersCard}>
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
                {(Date.now() - new Date(order.orderTime).getTime()) < 3600000  ? 
                  <td>
                      <Button onClick={(event) => {
                        buyerService.cancelOrder(order.id)
                        .then(res => {alert("Successfully canceled!"); navigate("/");})
                        .catch(e => { console.log(e); return; })}}>
                          Cancel
                      </Button>
                  </td>
                  :
                  <td></td>
              }
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

export default BuyerNewOrders;