import React from 'react'
import { useState, useEffect } from "react"

const SubCategories = () => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subcategory/")
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
            <div className='custom-tbody'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Product SubCategory</th>
                            <th scope="col">Product Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((val, i, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{val.id}</th>
                                        <td><button className='btn-access-data'>{val.SubcategoryName}</button></td>
                                        <td>{val.CategoryName}</td>
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
  
export default SubCategories;
  