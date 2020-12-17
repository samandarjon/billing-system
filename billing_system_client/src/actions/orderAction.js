import axios from "axios";
import {GET_FILE, GET_ORDERS} from "./types";

export const getInvoice = (order) => dispatch => {
    axios.post("/api/orders", order)
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_FILE,
                payload: res.data
            })

        })
        .catch(err => console.log(err))
}
export const getBilling = (dates) => dispatch => {
    axios.post("/api/orders/billing", dates)
        .then(res => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}
