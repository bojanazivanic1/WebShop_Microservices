import api from "../api/api"

import { GetUserModel } from "../models/Models";

const register = async (data) => {
    try {
      console.log(data)
      await api.post("auth/register", data, 
      {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } 
    catch (ex) {
      alert(ex.response.data.Exception);
      return Promise.reject(ex);
    }
};

const getUser = async () => {
  try {
      const res = await api.get("user");
        return new GetUserModel(
          res.data.id,
          res.data.username,
          res.data.email,
          res.data.name,
          res.data.lastName,
          res.data.birth.split("T")[0],
          res.data.address,
          res.data.userKind,
          res.data.image
        );
  }
  catch(e) {
      //alert(e.response.data.Exception);
      alert(e.response);
      return null;
  }
}

const updateUser = async (data) => {
  try {
      await api.put("user", data, 
      { 
        headers: { "Content-Type": "multipart/form-data" }
      });
  }
  catch(e) {
      alert(e.response.data.Exception);
      return Promise.reject(e);
  }
}

export default {
    register,
    getUser,
    updateUser
};