import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProduct, getProduct} from "../../actions/productActions";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@material-ui/icons/Delete';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import isEmpty from "../../validation/is-empty";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }

    }

    componentDidMount() {
        this.props.getProduct(this.state.page - 1)
    }

    onDeleteProduct(id) {
        this.props.deleteProduct(id)
    }

    handleChange = (event, value) => {
        this.setState({pape: value});
        this.props.getProduct(value - 1)
    };

    render() {
        const {products} = this.props.product
        let items;
        if (!isEmpty(products)) {
            items = products._embedded.products.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell align="right">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.info}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right"><Button variant="contained" color="primary"
                                                     component="span">
                        <Link className={"button-link"} to={"/product/" + row.id}>O`zgartish</Link>
                    </Button></TableCell>
                    <TableCell align="right"> <Button
                        variant="contained"
                        color="secondary"
                        onClick={event => this.onDeleteProduct(row.id)}
                        startIcon={<DeleteIcon/>}
                    >
                        O`chirish
                    </Button></TableCell>
                </TableRow>
            ))
        }
        return (
            <div>
                <Button className="btn-block" variant="contained" color="primary"
                        component="span"><Link className={"button-link"} to={"/addProduct"}>Mahsulot
                    qo`shish</Link></Button>
                <TableContainer component={Paper}>
                    <Table aria-label="caption table">
                        <caption><Pagination defaultValue={this.state.page} onChange={this.handleChange}
                                             count={isEmpty(products) ? 0 : products.page.totalPages}/>
                        </caption>
                        <TableHead>
                            <TableRow>
                                <TableCell lign="right">Id</TableCell>
                                <TableCell align="right">Qo`shimcha ma'lumot</TableCell>
                                <TableCell align="right">Nomi</TableCell>
                                <TableCell align="right">Narxi</TableCell>
                                <TableCell align="right"/>
                                <TableCell align="right"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    product: state.product

});
export default connect(mapStateToProps, {getProduct, deleteProduct})(Product);