import api from "../api/api"

import { GetOrderModel, GetProductModel } from "../models/Models";

const getOldOrders = async () => {
    try {
        const res = await api.get("buyer/get-old-orders");
        
        const orders = [];
  
        for(let i = 0; i < res.data.length; i++){
            const item = res.data[i];
            orders[i] = new GetOrderModel(
                item.id,
                item.deliveryAddress,
                item.comment,
                item.orderTime,
                item.deliveryTime,
                item.orderStatus,
                item.orderItems
            );
        }
        return orders;
    }
    catch(e) {
        //alert(e.response.data.Exception);
        alert(e.response);
        return null;
    }
}

const getNewOrders = async () => {
    try {
        const res = await api.get("buyer/get-new-orders");
        
        const orders = [];
  
        for(let i = 0; i < res.data.length; i++){
            const item = res.data[i];
            orders[i] = new GetOrderModel(
                item.id,
                item.deliveryAddress,
                item.comment,
                item.orderTime,
                item.deliveryTime,
                item.orderStatus,
                item.orderItems
            );
        }
        return orders;
    }
    catch(e) {
        //alert(e.response.data.Exception);
        alert(e.response);
        return null;
    }
}

const getProducts = async () => {
    try {
        const res = await api.get("buyer/get-products");
        
        const products = [];

        for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i];
            products[i] = new GetProductModel(
            item.id,
            item.name,
            item.price,
            item.amount,
            item.description,
            item.image
            );
        }
        return products;
    }
    catch(e) {
        //alert(e.response.data.Exception);
        //alert(e.response);
        return null;
    }
}

const addOrder = async (data) => {
    try {
      await api.post("buyer/add-order", data, 
      {
        headers: { "Content-Type": "application/json" }
      });
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

const cancelOrder = async (data) => {
    try {
      await api.post(`buyer/cancel-order/${data}`);
      return true;
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

export default {
    getOldOrders,
    getNewOrders,
    getProducts,
    addOrder,
    cancelOrder
};