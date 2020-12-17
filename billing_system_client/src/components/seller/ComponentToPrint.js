import React, {PureComponent} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import img from "./icon.png"

export class ComponentToPrint extends PureComponent {
    render() {
        let orders = this.props.list;
        let summ = this.props.summ;
        console.log(orders)
        return (
            <div className={"container invoice"}>
                <div className="row">
                    <div className="invoice-header col-md-8 offset-q">

                        <h2 className={"invoice-header"}><img src={img} className={"img-fluid"} alt="icon"/>Supermarket
                        </h2>

                        <h3>Chek yaratilgan sana: {new Date().toLocaleString()} </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <TableContainer component={Paper}>
                            <Table className={"table"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Mahulot nomi</TableCell>
                                        <TableCell align="right">Mahulot narxi</TableCell>
                                        <TableCell align="right">Umumiy narxi</TableCell>
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
                                            </TableRow>
                                        ))}
                                    <TableRow key={'dd'}><TableCell component="th" scope="row">
                                        Jami:
                                    </TableCell>
                                        <TableCell component="th" scope="row"/>
                                        <TableCell component="th" scope="row " align="right">
                                            {summ} so`m
                                        </TableCell></TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        );
    }
}