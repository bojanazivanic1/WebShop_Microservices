import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import classes from "./AvailableProducts.module.css";
import ProductItem from "../ProductItem/ProductItem";
import buyerService from "../../../services/buyerService";

const AvailableProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
      buyerService.getProducts().then((res) => {
        if (res != null) {
          setProducts(res.map(item => 
            <ProductItem 
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
              description={item.description}
              image={item.image}
            />)
            );
        }
      });
    }, []);

      return (
        <section className={classes.products}>
            <ul>{products}</ul>
        </section>
      );
};

export default AvailableProducts;