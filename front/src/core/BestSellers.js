import {getProducts} from "./apiCore";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Layout from "./Layout";
import Search from "./Search";

const BestSellers = () => {


const [productsBySell, setProductsBySell] = useState([]);
const [error, setError] = useState(false);

const loadProductsBySell = () => {
    getProducts("sold").then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setProductsBySell(data);
        }
    });
};

    useEffect(() => {
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Best Sellers"
            description="Welcome to the best gaming store on the planet!"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className=" card-game">
                        <Card class=" card-game" product={product} />
                    </div>
                ))}
            </div>

        </Layout>
    );
};

export default BestSellers;