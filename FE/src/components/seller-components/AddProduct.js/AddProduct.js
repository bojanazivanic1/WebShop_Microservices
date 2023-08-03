import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import productService from "../../../services/sellerService";
import classes from "./AddProduct.module.css";
import sellerService from "../../../services/sellerService";

const AddProduct = () => {
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
      imageFile: event.target.files[0],
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
    formData.append("name", enteredData.name);
    formData.append("price", +enteredData.price);
    formData.append("amount", +enteredData.amount);
    formData.append("description", enteredData.description);
    enteredData.imageFile && formData.append("imageFile", enteredData.imageFile);

    sellerService.addProduct(formData)
      .then((res) => {
        alert("Successfully added!");
        navigate("/home");
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  return (
    <Card className={classes.addProduct}>
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
                <img src={enteredData.imageFile && URL.createObjectURL(enteredData.imageFile)} />
            </span>
        </div>
        <div className={classes.actions}>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddProduct;
