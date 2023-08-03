import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import classes from "./VerifySellers.module.css";
import adminService from "../../../services/adminService";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { convertImage, formatDate } from "../../../helpers/helpers";

const VerifySellers = () => {
    const navigate = useNavigate();
    const [waitingSellers, setWaitingSellers] = useState([]);
    const [verifiedSellers, setVerifiedSellers] = useState([]);

    useEffect(() => {
        adminService.getWaitingSellers().then((res) => {
            if(res != null) {
                setWaitingSellers(res);
            }
        }); 
        adminService.getVerifiedSellers().then((res) => {
            if(res != null) {
                setVerifiedSellers(res);
            }
        }); 
    }, [adminService.verifySeller]);

    const verifyHandler = (status, sellerId) => {
        const seller = {
          id: sellerId,
          verificationStatus: status,
        };
        console.log(status, sellerId)

        adminService.verifySeller(seller)
            .then(res => {alert("Successfully!"); navigate("/");})
            .catch(e => { console.log(e); return; });  
    };

    return (
        <>
        <Card className={classes.waitingCard}>
            {waitingSellers.length > 0 ? (
                <>
                <h2>WAITING SELLERS</h2>
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
                <th></th>
                </tr>
            </thead>
            <tbody>
            {waitingSellers.map((seller) => (
                <tr key={seller.username}>
                    <td>{seller.username}</td>
                    <td>{seller.email}</td>
                    <td>{seller.name}</td>
                    <td>{seller.lastName}</td>
                    <td>{formatDate(seller.birth)}</td>
                    <td>{seller.address}</td>
                    <td>{seller.image && <img src={seller.image && convertImage(seller.image)} alt="Seller" />}</td>
                    <td>
                        <Button onClick={(event) => verifyHandler(1, seller.id)}>Approve</Button>
                        <Button className={classes.rejectBtn} onClick={(event) => verifyHandler(2, seller.id)}>Reject</Button>
                    </td>
                </tr>
                ))} 
            </tbody>
            </table>
            </>)
            :
            <p>No waiting sellers.</p>
            }
        </Card>
        <Card className={classes.verifiedCard}>
            {verifiedSellers.length > 0 ? (
                <>
                <h2>VERIFIED SELLERS</h2>
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
                </tr>
            </thead>
            <tbody>
            {verifiedSellers.map((seller) => (
                <tr key={seller.username}>
                <td>{seller.username}</td>
                <td>{seller.email}</td>
                <td>{seller.name}</td>
                <td>{seller.lastName}</td>
                <td>{formatDate(seller.birth)}</td>
                <td>{seller.address}</td>
                <td><img src={seller.image ? convertImage(seller.image) : require("../../../assets/user.jpg")} alt="Seller" /></td>
            </tr>
                ))} 
            </tbody>
            </table>
            </>)
            :
            <p>No verified sellers yet.</p>
            }
        </Card>
        </>
    );
};

export default VerifySellers;