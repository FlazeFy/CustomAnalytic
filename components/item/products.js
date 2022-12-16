import React from 'react'
import { useState, useEffect } from "react"

const SubCategoriesProducts = () => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subcategory/"+sessionStorage.getItem("ProductSubcategoryKey")+"/products")
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
            <div className='custom-tbody' style={{padding:"6px"}}>
               <h6 className='text-white'>Selected Category : {sessionStorage.getItem("ProductSubcategory")}</h6>
                {
                    data.map((val, i, index) => {
                        return (
                            <div className='product-box' key={val.id}>
                                <h6 className='product-info side-right'>Profit : <span className='value'>${val.ProductProfit}</span></h6>
                                <h6 className='product-info'>SKU : <span className='value'>{val.ProductSKU}</span></h6>
                                <div className='row'>
                                    <div className='col-lg-5 col-md-5 col-sm-12'>

                                    </div>
                                    <div className='col-lg-7 col-md-7 col-sm-12'>
                                        <h6 className='product-info'>Description</h6>
                                        <p className='value desc'>{val.ProductDescription}</p>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h6 className='product-info'>Color</h6>
                                                <p className='value desc'>{val.ProductColor}</p>
                                            </div>
                                            <div className='col-4'>
                                                <h6 className='product-info'>Size</h6>
                                                <p className='value desc'>{val.ProductSize}</p>
                                            </div>
                                            <div className='col-4'>
                                                <h6 className='product-info'>Style</h6>
                                                <p className='value desc'>{val.ProductStyle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div><hr></hr>
                                <h6 className='product-info product-name' style={{fontStyle:"italic"}}><span className='value' style={{fontSize:"18px", fontStyle:"normal"}}>{val.ProductName}</span> {val.ModelName}</h6>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
  
export default SubCategoriesProducts;
  