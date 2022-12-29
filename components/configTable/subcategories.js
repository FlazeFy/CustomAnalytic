//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons"

export default function ConfigTableSubcategories() {
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

    return (
        <div className='config-holder'>
            <button className='btn-config-table' title="Sorting by ID" onClick={(e)=> setSorting(getSorting(sessionStorage.getItem("TableSorting_Subcategory")))}><FontAwesomeIcon icon={faArrowsUpDown}/></button>
        </div>
    )
}