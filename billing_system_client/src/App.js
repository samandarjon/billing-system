import './App.css';
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import jwt_decode from "jwt-decode";
import {clearCurrentProfile, logoutUser, setCurrentUser} from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "./components/auth/Login";
import React from "react";
import SellerView from "./components/seller/SellerView";
import PrivateRoute from "./components/comman/PrivateRoute";
import Product from "./components/product/Product";
import UpdateProduct from "./components/product/UpdateProduct";
import AddProduct from "./components/product/AddProduct";
import Order from "./components/billing/Billing";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current Profile
        store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = "/login";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className={"container"}>

                        <Route exact path="/" component={Login}/>
                        <Route exact path="/login" component={Login}/>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/seller" component={SellerView}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/product"
                                component={Product}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/product/:id"
                                component={UpdateProduct}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/addProduct"
                                component={AddProduct}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/billing"
                                component={Order}
                            />
                        </Switch>
                    </div>
                </div>
            </Router></Provider>
    );
}

export default App;
