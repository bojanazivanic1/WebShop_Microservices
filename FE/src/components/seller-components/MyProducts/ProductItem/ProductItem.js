import sellerService from "../../../../services/sellerService";
import Button from "../../../UI/Button/Button";
import classes from "./ProductItem.module.css";
import { useNavigate } from "react-router-dom";
import { convertImage } from "../../../../helpers/helpers";

const ProductItem = (props) => {
    const navigate = useNavigate();

    const price = `$${props.price.toFixed(2)}`;

    const updateHandler = (event) => {
        navigate(`/update-product?id=${props.id}`);  
    };

    const deleteHandler = (event) => {
        event.preventDefault();

        sellerService.deleteProduct(props.id)
            .then(res => {alert("Successfully deleted!"); 
                navigate("/"); })
            .catch(e => { console.log(e); return; });        
    };

    return (
        <li className={classes.product}>
            <div>
                <img 
                    src={props.image ? convertImage(props.image) : require("../../../../assets/product.jpg")}
                    alt={props.name}    
                />
            </div>

            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
            </div>
            
            <div className={classes.price}>
                {price}
            </div>
            <div className="buttons">
                <div><Button className={classes.btn} onClick={updateHandler}>Update</Button></div>
                <div><Button className={classes.btn} onClick={deleteHandler}>Delete</Button></div>
            </div>
        </li>
    );
};

export default ProductItem;