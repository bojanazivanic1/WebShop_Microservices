import React, { Fragment, useEffect, useState } from "react";
import classes from "./MyProducts.module.css";
import sellerService from "../../../services/sellerService";
import ProductItem from "./ProductItem/ProductItem";
import Card from "../../UI/Card/Card";

const MyProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
      sellerService.getProducts().then((res) => {
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
            <Card>
                <ul>{products}</ul>
            </Card>
        </section>
    );
};

export default MyProducts;