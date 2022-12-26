import React from 'react'
import { useState, useEffect } from "react"

const LastSales = () => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/sales/last/15")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.data);
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
            <div className='custom-tbody'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Date</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Subcategory Name</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((val, i, index) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{val.Order_Date}</th>
                                        <td>{val.ProductName}</td>
                                        <td>{val.OrderQuantity}</td>
                                        <td>{val.SubcategoryName}</td>
                                        <td>{val.Total_Price}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
  
export default LastSales;
  