import { useContext } from 'react';
import classes from "./ProductItem.module.css";
import ProductItemForm from '../ProductItemForm/ProductItemForm';
import CartContext from '../../../auth-context/cart-context';
import { convertImage } from '../../../helpers/helpers';
import Card from '../../UI/Card/Card';

const ProductItem = (props) => {
    const cartContext = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };

    return (
        <Card className={classes.productCard}>
        <li className={classes.product}>
            <div>
                <img 
                    src={props.image ? convertImage(props.image) : require("../../../assets//product.jpg")}
                    alt={props.name}    
                />
            </div>
            <div className={classes.textDiv}>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div className={classes.formDiv}>
                <ProductItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
        </Card>
    );
};

export default ProductItem;