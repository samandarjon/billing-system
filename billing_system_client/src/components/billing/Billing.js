import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getBilling} from "../../actions/orderAction";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
class Billing extends Component {
    constructor() {
        super();
        this.state = {
            start: new Date().toISOString().substring(0, 10),
            end: new Date().toISOString().substring(0, 10)

        }
    }

    onSubmit(e) {
        e.preventDefault();
        let dates = {start: this.state.start, end: this.state.end}
        console.log(dates)
        this.props.getBilling(dates)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {orders} = this.props.order
        let items
        if (!isEmpty(orders)) {
            items = orders.orders.map(order => (<TableRow key={order.id}>
                <TableCell lign="right">{order.id}</TableCell>
                <TableCell align="right">{order.product.name}</TableCell>
                <TableCell align="right">{order.product.info}</TableCell>
                <TableCell align="right"><Moment format="YYYY/MM/DD">{order.createAt}</Moment></TableCell>
            </TableRow>))
        }
        return (
            <divx>
                <div className="row">
                    <div className="col-md">
                        <h1>Xaridlar haqida hisobot</h1>
                        <form onSubmit={e => this.onSubmit(e)}>
                            <TextField
                                name={"start"}
                                id="date"
                                label="Boshlang`ich vaqt"
                                type="date"
                                defaultValue={this.state.start}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={event => this.onChange(event)}
                            />
                            <TextField
                                id="date"
                                label="Tugash vaqti vaqt"
                                type="date"
                                name={"end"}
                                defaultValue={this.state.end}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={event => this.onChange(event)}
                            />
                            <input type={"submit"} className={"my-2 btn btn-block billing"} value={"Hisobot olish"}/>

                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <h4>Jami foyda: {isEmpty(orders) ? 0 : orders.profit}</h4>
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell lign="right">Id</TableCell>
                                        <TableCell align="right">Nomi</TableCell>
                                        <TableCell align="right">Qo`shimcha ma'lumot</TableCell>
                                        <TableCell align="right">Sotib olingan vaqt</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </divx>
        );
    }
}

Billing.propTypes = {
    order: PropTypes.object.isRequired,
    getBilling: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    order: state.order
});
export default connect(mapStateToProps, {getBilling})(Billing);