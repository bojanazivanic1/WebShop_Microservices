import React from "react";
import classes from "./OrderTable.module.css";
import { formatDateTime } from "../../../helpers/helpers";

const OrderTable = ({ orders }) => {

  
  console.log(orders)

  return (
    <>
      {orders.length > 0 ? (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Delivery Address</th>
              <th>Comment</th>
              <th>Order Time</th>
              <th>Delivery Time</th>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.comment}</td>
                <td>{formatDateTime(order.orderTime)}</td>
                <td>{formatDateTime(order.deliveryTime)}</td>
                <td>
                  {order.orderItems.map((item) => (
                    <span>
                      {item.name} x {item.amount}
                      <br />
                    </span>
                  ))}
                </td>
                {order.orderStatus === 0 ? <td></td> : <td>Canceled</td>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders to view.</p>
      )}
    </>
  );
};

export default OrderTable;
