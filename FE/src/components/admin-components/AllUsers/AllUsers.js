import React, { useEffect, useState } from "react";
import adminService from "../../../services/adminService";
import Card from "../../UI/Card/Card";
import classes from "./AllUsers.module.css";
import { convertImage, formatDate } from "../../../helpers/helpers";

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        adminService.getAllUsers().then((res) => {
            if(res != null) {
                setUsers(res);
            }
        }); 
    }, []);

    return (
        <Card className={classes.allUsers}>
            {users.length > 0 ? (
                <>
                <table>
                    <thead>
                        <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Birth</th>
                        <th>Address</th>
                        <th>Image</th>
                        <th>User Kind</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{formatDate(user.birth)}</td>
                            <td>{user.address}</td>
                            <td><img src={user.image ? convertImage(user.image) : require("../../../assets/user.jpg")} alt="User" /></td>
                            {user.userKind === 1 ? <td>Seller</td> : <td>Buyer</td>}
                        </tr>
                        ))} 
                    </tbody>
                </table>
                </>)
                :
                <p>No users.</p>
            }
        </Card>
    );
};

export default AllUsers;