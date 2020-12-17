import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOneProduct, updateProduct} from "../../actions/productActions";
import {getTax} from "../../actions/taxActions";
import TextFieldGroup from "../comman/TextFieldGroup";

class UpdateProduct extends Component {
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

    componentDidMount() {
        this.props.getOneProduct(this.props.match.params.id);
        this.props.getTax()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let product = nextProps.product.product
        this.state = {
            name: product.name,
            id: product.id,
            type: product.type,
            info: product.info,
            billingPrices: product.billingPrices,
            discount: product.discount,
            price: product.price
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const updateProduct = {...this.state};
        updateProduct.id = this.props.match.params.id;
        updateProduct.price = parseFloat(updateProduct.price)
        updateProduct.discount = parseFloat(updateProduct.discount)

        this.props.updateProduct(this.props.match.params.id, updateProduct, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1 className="my-4">Mahulotni o`zgartirishi</h1>
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
                    <input type={"submit"} className={"btn btn-block"} value={"O`zartish"}/>
                </form>
            </div>
        );
    }
}

UpdateProduct.propTypes = {
    product: PropTypes.object.isRequired,
    tax: PropTypes.object.isRequired,
    getOneProduct: PropTypes.func.isRequired,
    getTax: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    product: state.product

});
export default connect(mapStateToProps, {getOneProduct, getTax, updateProduct})(UpdateProduct);