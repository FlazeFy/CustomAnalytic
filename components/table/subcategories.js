import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from "react"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"

const SubCategories = ({item}) => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/subcategory/"+sessionStorage.getItem("TableSorting_Subcategory"))
        .then(res => res.json())
            .then(
            (result) => {
                //Default config
                if(sessionStorage.getItem("TableSorting_Subcategory") == null){
                    sessionStorage.setItem("TableSorting_Subcategory", "ASC");
                }

                setIsLoaded(true);
                setItems(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    function setSession(id, name){
        sessionStorage.setItem("ProductSubcategoryKey", id);
        sessionStorage.setItem("ProductSubcategory", name);
        location.reload();
    }

    function getSortingIcon(sort){
        if(sort == "ASC"){
            return faArrowUp;
        } else {
            return faArrowDown;
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                <Image
                    src="/loading.gif"
                    alt="Vercel Logo"
                    className='loading-logo'
                    width={100}
                    height={100}
                    priority
                />
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        );
    } else {
        return (
            <div className='custom-tbody'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID <FontAwesomeIcon icon={getSortingIcon(sessionStorage.getItem("TableSorting_Subcategory"))} style={{fontSize:"14px !important"}}/></th>
                            <th scope="col">Product SubCategory</th>
                            <th scope="col">Product Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((val, i, index) => {
                                return (
                                    <tr key={val.id}>
                                        <th scope="row">{val.id}</th>
                                        <td><button className='btn-access-data' onClick={(e)=> setSession(val.id, val.SubcategoryName)}>{val.SubcategoryName}</button></td>
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
  