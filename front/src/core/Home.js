import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts} from "./apiCore";
import Card from "./Card";
import Search from "./Search";


const Home = () => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };
    const loadMore = () => {
        let toSkip = skip + limit;
        getProducts().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        loadProductsByArrival();
    }, []);

    return (
        <Layout
            title="Home Page"
            description="Welcome to the best gaming store on the planet!"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="card-game">
                        <Card class="card-game" product={product} />
                    </div>
                ))}
            </div>
            {loadMoreButton()}



        </Layout>
    );
};

export default Home;
