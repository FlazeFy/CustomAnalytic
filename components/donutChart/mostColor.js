import React from 'react'
import { useState, useEffect } from "react"

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function MostColor() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/product/mostcolor/"+sessionStorage.getItem("ChartLimit_MostColor"))
        .then(res => res.json())
            .then(
            (result) => {
                //Default config
                if(sessionStorage.getItem("ChartLimit_MostColor") == null){
                    sessionStorage.setItem("ChartLimit_MostColor", "10");
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

    function getSeries(val){
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e.Total));
        });
        return catSeries;
    }

    function getCategory(val){
        let catData = [];
        val.forEach(e => { 
            catData.push(e.ProductColor);
        });
        return catData;
    }

    chart = {
        series: getSeries(data),
        options: {
            labels: getCategory(data),
            plotOptions: {
                donut: {
                  size: 200
                }
            }
        }
    };

    //Chart filter and config
    function setLimit(limit){
        sessionStorage.setItem("ChartLimit_MostColor", limit);
        location.reload();
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='custom-tbody' style={{padding:"6px"}}>
                <h6 className='text-white'>Most Produced Color</h6>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item"><input type="number" className='form-control' min="2" defaultValue={sessionStorage.getItem("ChartLimit_MostColor")} onBlur={(e)=> setLimit(e.target.value)}></input></a></li>
                    </ul>
                </div>
                <div className="BalanceChart me-4">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="donut"
                    />
                </div>
            </div>
        );
    }
}
  