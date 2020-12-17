import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProductWithTerm} from "../../actions/productActions";
import isEmpty from "../../validation/is-empty";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from "@material-ui/icons/Delete";
import {getInvoice} from "../../actions/orderAction";
import {ComponentToPrint} from "./ComponentToPrint";
import ReactToPrint, {PrintContextConsumer} from "react-to-print";


class SellerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: "",
            product: "",
            term: "",
            orders: [],
            show: false,
            quantity: 0.0,
            summ: 0.0
        }
    }

    componentDidMount() {
        const {user} = this.props.auth;
        if (user.role[0].roleName !== "ROLE_SELLER") {
            this.props.history.push("/login")
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    search() {
        this.props.getProductWithTerm(this.state.term);
    }

    onClickProduct(product) {

        this.setState({product: product, show: true})

    }

    onQuantityChange(e) {

        this.setState({[e.target.name]: parseFloat(e.target.value)});
        console.log(this.state)
    }

    addToOrder() {
        const quantity = this.state.quantity;
        if (quantity > 0.0) {
            let order = {
                product: this.state.product,
                quantity: quantity
            }
            let orders = this.state.orders;
            orders.push(order)
            let summ = parseFloat(this.state.summ) + order.product.price * order.quantity
            this.setState({orders: orders, summ: summ})
        }
    }

    onDeleteOrder(index, order) {
        let orders = this.state.orders;
        orders.splice(index, 1)
        let summ = this.state.summ - order.product.price * order.quantity
        this.setState({orders: orders, summ: summ})

    }

    print(f) {

        console.log(this.state)
        console.log(this.state.orders)
        let orders = this.state.orders;
        let orderDto = []
        orders.forEach(order => orderDto.push({productId: order.product.id, amount: order.quantity}))
        this.props.getInvoice(orderDto)
        f()

    }


    clear() {
        this.setState({
            products: "",
            product: "",
            term: "",
            orders: [],
            show: false,
            quantity: 0.0,
            summ: 0
        })
    }


    render() {


        const orders = this.state.orders;
        const {products} = this.props.product;
        let findItems = ""
        if (!isEmpty(products)) {
            findItems = products._embedded.products.map(p => (
                    <button key={p.id} className="btn btn-block"
                            onClick={e => this.onClickProduct(p)}> {p.name}</button>
                )
            )
        }
        return (
            <div>
                <div className="row">
                    <div className={"col-md-4"}>
                        <div className={"d-none"}>
                            <ComponentToPrint list={this.state.orders} summ={this.state.summ}
                                              ref={el => (this.componentRef = el)}/></div>
                        <button className={"btn btn-block"} onClick={event => this.clear()}>
                            Tozlash
                        </button>
                        <TextField
                            name={"term"}
                            id="standard-select-currency"
                            value={this.state.term ? this.state.term : ""}
                            onChange={event => this.handleChange(event)}

                        >
                        </TextField>
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon onClick={event => this.search()}/>
                        </IconButton>
                        {findItems}
                        {this.state.show ? (<div><TextField
                            type={"number"}
                            step="0.01"
                            name={"quantity"}
                            id={"quantity"}
                            value={this.state.quantity}
                            onChange={event => this.onQuantityChange(event)}
                        >
                        </TextField>
                            <Button className={"btn-block mt-2"} onClick={event => this.addToOrder()}
                                    variant="contained"
                                    color="primary">Qo`shish</Button>

                        </div>) : ""}
                    </div>
                    <div className={"col-md-8"}>
                        <div>
                            {orders.length > 0 ? (
                                <ReactToPrint content={() => this.componentRef}>
                                    <PrintContextConsumer>
                                        {({handlePrint}) => (
                                            <Button className={"btn-block mb-2"}
                                                    onClick={event => this.print(handlePrint)} variant="contained"
                                                    color="primary">Print</Button>
                                        )}
                                    </PrintContextConsumer>
                                </ReactToPrint>) : ""}

                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Mahulot nomi</TableCell>
                                            <TableCell align="right">Mahulot narxi</TableCell>
                                            <TableCell align="right">Umumiy narxi</TableCell>
                                            <TableCell align="right"/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {

                                            orders.map((order, index) => (
                                                <TableRow key={order.product.id}>
                                                    <TableCell component="th" scope="row">
                                                        {order.product.name}
                                                    </TableCell>
                                                    <TableCell align="right">{order.product.price} so`m</TableCell>
                                                    <TableCell
                                                        align="right">{order.product.price} * {order.quantity} = {(order.product.price * order.quantity).toFixed(2)} so`m</TableCell>
                                                    <TableCell> <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={event => this.onDeleteOrder(index, order)}
                                                        startIcon={<DeleteIcon/>}
                                                    >
                                                        Delete
                                                    </Button></TableCell>
                                                </TableRow>
                                            ))}
                                        <TableRow key={'21321342141'}><TableCell component="th" scope="row">
                                            Jami:
                                        </TableCell>
                                            <TableCell component="th" scope="row"> </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.state.summ} so`m
                                            </TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

SellerView.propTypes = {
    product: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
    getInvoice: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    product: state.product,
    file: state.file,
    auth: state.auth
});
export default connect(
    mapStatetoProps,
    {getProductWithTerm, getInvoice}
)(SellerView);
