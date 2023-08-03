import api from "../api/api"

import { GetOrderModel, GetUserModel } from "../models/Models";

const getWaitingSellers = async () => {
    try {
        const res = await api.get("user/get-waiting-sellers");
        return res.data;
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

const getVerifiedSellers = async () => {
    try {
        const res = await api.get("user/get-verified-sellers");

        const users = [];

        for(let i = 0; i < res.data.length; i++){
            const item = res.data[i];
            users[i] = new GetUserModel(
                item.id,
                item.username,
                item.email,
                item.name,
                item.lastName,
                item.birth,
                item.address,
                item.userKind,
                item.image
            );
        }
        return users;
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

const getAllUsers = async () => {
  try {
      const res = await api.get("user/get-all-users");

      const users = [];

      for(let i = 0; i < res.data.length; i++){
          const item = res.data[i];
          users[i] = new GetUserModel(
              item.id,
              item.username,
              item.email,
              item.name,
              item.lastName,
              item.birth,
              item.address,
              item.userKind,
              item.image
          );
      }
      return users;
  } 
  catch (ex) {
    alert(ex.response.data.Exception);
    return Promise.reject(ex);
  }
};

const getAllOrders = async () => {
    try {
        const res = await api.get("admin/get-all-orders");
        
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
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

const verifySeller = async (data) => {
    try {
      await api.post("user/verify-seller", data, 
      {
        headers: { "Content-Type": "application/json" }
      });
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

export default {
    getWaitingSellers,
    getVerifiedSellers,
    getAllUsers,
    getAllOrders,
    verifySeller,
};