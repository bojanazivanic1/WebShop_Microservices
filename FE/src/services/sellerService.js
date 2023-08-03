import api from "../api/api"

import { GetOrderModel, GetProductModel } from "../models/Models";

const addProduct = async (data) => {
    try {
      await api.post("seller/add-product", data, 
      {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

const updateProduct = async (data) => {
  try {
    console.log(data)
      await api.put("seller/update-product", data, 
      { 
        headers: { "Content-Type": "multipart/form-data" }
      });
  }
  catch(e) {
      alert(e.response.data.Exception);
      return Promise.reject(e);
  }
}

const deleteProduct = async (productId) => {
  try {
    await api.delete(`seller/remove-product/${productId}`);
  } 
  catch (ex) {
    alert(ex.response.data.Exception);
    return Promise.reject(ex);
  }
};

const getProducts = async () => {
  try {
      const res = await api.get("seller/get-products");

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
      console.log(e)
      alert(e.response);
      return null;
  }
}

const getProduct = async (id) => {
  try {
      const res = await api.get(`seller/get-product/${id}`);

      const product = new GetProductModel(
        res.data.id,
        res.data.name,
        res.data.price,
        res.data.amount,
        res.data.description,
        res.data.image
      );
      return product;
  }
  catch(e) {
      //alert(e.response.data.Exception);
      console.log(e)
      alert(e.response);
      return null;
  }
}

const getNewOrders = async () => {
  try {
      const res = await api.get("seller/get-new-orders");

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

const getOldOrders = async () => {
  try {
      const res = await api.get("seller/get-old-orders");
      
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

export default {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct,
    getNewOrders,
    getOldOrders
};