import { useState, useEffect } from "react"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsUpDown, faCheck, faFilter } from "@fortawesome/free-solid-svg-icons"

export default function ConfigTableSubcategories() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items2, setItems2] = useState([]);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/product/category")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems2(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    //Chart filter and config
    function setSorting(sort){
        sessionStorage.setItem("TableSorting_Subcategory", sort);
        location.reload();
    }

    function getSorting(sort){
        if(sort == "ASC"){
            return "DESC";
        } else {
            return "ASC";
        }
    }

    function setCategory(type){
        sessionStorage.setItem("TableFilter_Subcategory", type);
        location.reload();
    }

    function getFilteringButton(){
        if(sessionStorage.getItem("TableFilter_Subcategory") == "All"){
            return (
                <li><a className="dropdown-item"><FontAwesomeIcon icon={faCheck} onClick={(e)=> setCategory("All")}/> All</a></li>
            );
        } else {
            return (
                <li><a className="dropdown-item" onClick={(e)=> setCategory("All")}>All</a></li>
            );
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='config-holder'>
                <button className='btn-config-table' title="Sorting by ID" onClick={(e)=> setSorting(getSorting(sessionStorage.getItem("TableSorting_Subcategory")))}><FontAwesomeIcon icon={faArrowsUpDown}/></button>
                <div className="dropdown">
                    <button className='btn-config-table' type="button" id="dropdownMenuButton1" title="Filter by Category" style={{top:"50px"}} data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faFilter}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            //Category type filter
                            items2.map((val, i, index) => {
                                if(val.CategoryName == sessionStorage.getItem("TableFilter_Subcategory")){
                                    return (
                                        <li key={i}><a className="dropdown-item"><FontAwesomeIcon icon={faCheck} onClick={(e)=> setCategory(val.CategoryName)}/> {val.CategoryName}</a></li>
                                    );
                                } else {
                                    return (
                                        <li key={i}><a className="dropdown-item" onClick={(e)=> setCategory(val.CategoryName)}>{val.CategoryName}</a></li>
                                    );
                                }
                            })
                        }
                        {getFilteringButton()}
                    </ul>
                </div>
            </div>
        )
    }
}