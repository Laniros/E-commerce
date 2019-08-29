import React, { useState, useEffect } from "react";
import {  list } from "./apiCore";
import Card from "./Card";
import {getUsers} from "../admin/apiAdmin";

const SearchByUser = () => {
    const [data, setData] = useState({
        users: "",
        search: "",
        results: [],
        searched: false
    });

    const { users, search, results, searched } = data;


    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, users: data });
            }
        });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const searchData = () => {
        if (search) {
            list({ search: search || undefined, users: users }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("user")}
                        >
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div>
            <h2>Search Users:
                {JSON.stringify(users)}
            </h2>

        </div>



    );
};

export default SearchByUser;

{/*<div className="row">*/}
{/*    <div className="container mb-3">{searchForm()}</div>*/}
{/*    <div className="container-fluid mb-3">*/}
{/*        {searchedProducts(results)}*/}
{/*    </div>*/}
{/*</div>*/}