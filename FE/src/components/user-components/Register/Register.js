import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import userService from "../../../services/userService";
import classes from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [enteredData, setEnteredData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        name: "",
        lastname: "",
        birth: "",
        address: "",
        userKind: 0,
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
            imageFile: event.target.files[0]
        }));
    };

    const validate = () => {
        let errors = {};

        if(!enteredData.email)
            errors.email = "Email is required.";
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(enteredData.email))
            errors.email = "Email is invalid.";
        if(!enteredData.username)
            errors.username = "Username is required.";
        else if(!/^[a-zA-Z0-9]+$/.test(enteredData.username))
            errors.username = "Username is invalid.";
        if(enteredData.password.trim().length <= 2)
            errors.password = "Password must be at least 3 characters long.";
        if(enteredData.password !== enteredData.confirmPassword)
            errors.confirmPassword = "Passwords do not match.";
        if(!enteredData.name)
            errors.name = "Name is required."
        if(!enteredData.lastname)
            errors.lastname = "Lastname is required."
        if(!enteredData.address)
            errors.address = "Address is required."
        let birthDate = new Date(enteredData.birth);
        if(!enteredData.birth)
            errors.birth = "Birth Date is required.";
        else {
            let currentDate = new Date();
            let timeDiff = currentDate.getTime() - birthDate.getTime();
            let age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
            if(age < 15 && age > 100)
                errors.birth = "You must be at least 16 years old.";
        }        
        if(enteredData.userKind == 0)
            errors.userKind = "Please select a user kind."; 
        
        return errors;
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setErrors(validate());
        if(Object.keys(errors).length !== 0){
            return;
        }

        const formData = new FormData();
        formData.append("username", enteredData.username);
        formData.append("password", enteredData.password);
        formData.append("email", enteredData.email);
        formData.append("name", enteredData.name);
        formData.append("lastName", enteredData.lastname);
        formData.append("birth", enteredData.birth);
        formData.append("address", enteredData.address);
        formData.append("userKind", +enteredData.userKind);
        enteredData.imageFile && formData.append("imageFile", enteredData.imageFile);

        userService.register(formData)
            .then(res => {
                enteredData.userKind == 1 ?
                alert("Successfully registered! Wait for admin to verify your profile.")
                : alert("Successfully registered!");
                navigate("/"); })
            .catch(e => { console.log(e); return; });    
    };

    return (
        <Card className={classes.register}> 
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={enteredData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className={classes.error}>{errors.email}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={enteredData.username}
                        onChange={handleInputChange}
                    />
                    {errors.username && <p className={classes.error}>{errors.username}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={enteredData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className={classes.error}>{errors.password}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={enteredData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    {errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword}</p>}
                </div>
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
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={enteredData.lastname}
                        onChange={handleInputChange}
                    />
                    {errors.lastname && <p className={classes.error}>{errors.lastname}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={enteredData.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && <p className={classes.error}>{errors.address}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="birth">Birth Date</label>
                    <input
                        type="date"
                        id="birth"
                        name="birth"
                        value={enteredData.birth}
                        onChange={handleInputChange}
                    />
                    {errors.birth && <p className={classes.error}>{errors.birth}</p>}
                </div>     
                <div className={classes.control}>
                    <label htmlFor="userKind">User Kind</label>
                    <select
                        value={enteredData.userKind}
                        onChange={handleInputChange}
                        name="userKind"
                    >
                        <option value="0"></option>
                        <option value="1">Seller</option>
                        <option value="2">Buyer</option>
                    </select>
                    {errors.userKind && <p className={classes.error}>{errors.userKind}</p>}
                </div>                
                <div className={classes.inputFile}>
                    <label htmlFor="imageFile">Image</label>
                    <input
                        type="file"
                        accept="image/jpg"
                        id="imageFile"
                        name="image"
                        onChange={imageChangeHandler}
                    />
                    <span>
                        <img src={enteredData.imageFile && URL.createObjectURL(enteredData.imageFile)} />
                    </span>
                </div>
                <Button type="submit" className={classes.btn}>
                    Register
                </Button>
            </form>
            <div className={classes.control}>
              <p>Do you have an account? <Link to={"/"} className={classes.link}>Log In</Link></p>
            </div>
        </Card>
    );
};

export default Register;