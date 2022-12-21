import React from 'react'
import { useState, useEffect } from "react"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose} from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

const LastProductSales = ({id}) => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/sales/products/"+ id)
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

        return (
            <>
                <h6 className='mt-4 text-white'>Last Transaction</h6>
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
                                    <tr key={val.Id}>
                                        <th scope="row">{val.Id}</th>
                                        <td>{val.OrderDate}</td>
                                        <td>{val.StockDate}</td>
                                        <td>{val.CustomerKey}</td>
                                        <td>{val.Country}</td>
                                        <td>{val.OrderLineItem}</td>
                                        <td>{val.Qty}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        );
               
    }
}
  
export default LastProductSales;
  