import React, {Component} from 'react';
import PropTypes from "prop-types";
import TextFieldGroup from "../comman/TextFieldGroup";
import {connect} from "react-redux";
import {addProduct} from "../../actions/productActions";

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            id: "",
            type: "",
            info: "",
            billingPrices: [],
            discount: 0.0,
            price: 0.0
        }
    }


    onSubmit(e) {
        e.preventDefault();
        const newProduct = {...this.state};
        newProduct.price = parseFloat(newProduct.price)
        newProduct.discount = parseFloat(newProduct.discount)
        this.props.addProduct(newProduct, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1 className="my-4">Mahulot qo`shish</h1>
                <form onSubmit={event => this.onSubmit(event)}>
                    <TextFieldGroup
                        placeholder="Mahsulot nomi"
                        name="name"
                        required={true}
                        value={this.state.name}
                        onChange={(e) => this.onChange(e)}
                    />
                    <TextFieldGroup
                        placeholder="Mahulot haqida qisqach"
                        name="info"
                        required={true}
                        value={this.state.info}
                        onChange={(e) => this.onChange(e)}
                    />
                    <TextFieldGroup
                        placeholder="Mahulot narxi"
                        name="price"
                        required={true}
                        type={"number"}
                        value={this.state.price}
                        onChange={(e) => this.onChange(e)}
                    />
                    <TextFieldGroup
                        placeholder="Mahulot o`lchov turi"
                        name="type"
                        required={true}
                        value={this.state.type}
                        onChange={(e) => this.onChange(e)}
                    />
                    <TextFieldGroup
                        placeholder="Mahulotga chegirma"
                        name="discount"
                        required={true}
                        type={"number"}
                        value={this.state.discount}
                        onChange={(e) => this.onChange(e)}
                    />
                    <input type={"submit"} className={"btn btn-block"} value={"Qo`shish"}/>
                </form>
            </div>
        );
    }
}

AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired
}
export default connect(null, {addProduct})(AddProduct)