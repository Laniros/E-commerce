import {deleteProduct, getProducts} from "./apiAdmin";
import React, { useState, useEffect } from "react";
import {isAuthenticated} from "../auth";
import Layout from "../core/Layout";
import {Link} from "react-router-dom";
import {getCategories, deleteCategory} from "./apiAdmin";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories();
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Layout
            title="Manage Categories"
            description=""
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {categories.length} Categories
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {categories.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <span style={{cursor:'pointer'}}
                                      onClick={() => destroy(p._id)}
                                      className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};


export default ManageCategories;