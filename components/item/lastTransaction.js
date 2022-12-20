import React from 'react'
import { useState, useEffect } from "react"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose} from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

const LastProductSales = ({props}) => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/sales/products/"+ props.id)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const modalCall = "#see_sales"+props.id;
        const keyCall = "see_sales"+props.id;

        return (
            <>
                <button className='product-info product-sales'  data-bs-toggle="modal" data-bs-target={modalCall}>Product Sales</button>
                <div className="modal fade" id={keyCall} tabIndex="-1" aria-labelledby="addPurchasedLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button className="btn btn-close-modal" title="Close" data-bs-dismiss="modal"><FontAwesomeIcon icon={faClose} width="14.5px"/></button>
                                <h6>Last Transaction</h6>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Number</th>
                                            <th scope="col">Order Date</th>
                                            <th scope="col">Stock Date</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Teritory</th>
                                            <th scope="col">Order Line</th>
                                            <th scope="col">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((val, i, index) => {
                                                return (
                                                    <tr key={val.id}>
                                                        <th scope="row">{val.OrderNumber}</th>
                                                        <td>{val.OrderDate}</td>
                                                        <td>{val.StockDate}</td>
                                                        <td>{val.Customer}</td>
                                                        <td>{val.Teritory}</td>
                                                        <td>{val.OrderLine}</td>
                                                        <td>{val.Qty}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
               
    }
}
  
export default LastProductSales;
  