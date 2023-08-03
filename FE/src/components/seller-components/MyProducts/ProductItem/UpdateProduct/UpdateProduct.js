import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./UpdateProduct.module.css";
import Card from "../../../../UI/Card/Card";
import Button from "../../../../UI/Button/Button";
import sellerService from "../../../../../services/sellerService";
import { convertImage } from "../../../../../helpers/helpers";

const UpdateProduct = (props) => {
    const navigate = useNavigate();
    const [enteredData, setEnteredData] = useState({
        name: "",
        price: 0,
        amount: 0,
        description: "",
        image: "",
        imageFile: "",
      });
      const [errors, setErrors] = useState({});
    
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");
  
      useEffect(() => {
          sellerService.getProduct(id).then((res) => {
              if(res != null) {
                  setEnteredData({
                      ...enteredData,
                      ...res,
                      imageFile: res.image,
                      image: "",
                  })
              }});
      }, []);

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEnteredData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const imageChangeHandler = (event) => {
        setEnteredData((prevData) => ({
          ...prevData,
          image: event.target.files[0],
        }));
      };

    const validate = () => {
        let errors = {};
    
        if (!enteredData.name.trim()) {
          errors.name = "Name is required.";
        }
        if (+enteredData.price <= 0) {
          errors.price = "Price must be greater than 0.";
        }
        if (+enteredData.amount <= 0) {
          errors.amount = "Amount must be greater than 0.";
        }
        if (!enteredData.description.trim()) {
          errors.description = "Description is required.";
        }
    
        return errors;
      };

      const submitHandler = (event) => {
        event.preventDefault();
    
        setErrors(validate());
        if (Object.keys(errors).length !== 0) {
          return;
        }
    
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", enteredData.name);
        formData.append("price", +enteredData.price);
        formData.append("amount", +enteredData.amount);
        formData.append("description", enteredData.description);
        enteredData.image ? formData.append("imageFile", enteredData.image) : 
                            formData.append("image", enteredData.imageFile);

        sellerService.updateProduct(formData)
          .then((res) => {
            alert("Successfully changed!");
            navigate("/home");
          })
          .catch((e) => {
            console.log(e);
            return;
          });
      };

    return (
        <Card className={classes.updateProduct}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={enteredData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className={classes.error}>{errors.name}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={enteredData.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className={classes.error}>{errors.price}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min={1}
            value={enteredData.amount}
            onChange={handleInputChange}
          />
          {errors.amount && <p className={classes.error}>{errors.amount}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={enteredData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className={classes.error}>{errors.description}</p>}
        </div>  
        <div className={classes.inputFile}>
          <label htmlFor="imageFile">Image</label>
          <input
            type="file"
            id="imageFile"
            name="image"
            accept="image/jpg"
            onChange={imageChangeHandler}
          />
            <span>
                <img
                src={enteredData.image ? URL.createObjectURL(enteredData.image) : enteredData.imageFile && convertImage(enteredData.imageFile)}
                />
            </span>
                </div>
                <Button type="submit" className={classes.btn}>
                    Update
                </Button>
            </form>

        </Card>
    );
};

export default UpdateProduct;