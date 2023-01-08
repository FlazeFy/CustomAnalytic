import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function MostSize() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/product/mostsize/"+sessionStorage.getItem("ChartLimit_MostSize")+"/"+sessionStorage.getItem("ChartType_MostSize"))
        .then(res => res.json())
            .then(
            (result) => {
                //Default config
                if(sessionStorage.getItem("ChartLimit_MostSize") == null || sessionStorage.getItem("ChartType_MostSize") == null){
                    sessionStorage.setItem("ChartLimit_MostSize", "10");
                    sessionStorage.setItem("ChartType_MostSize", "Bikes");
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
            catData.push(e.ProductSize);
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
        sessionStorage.setItem("ChartLimit_MostSize", limit);
        location.reload();
    }

    function setCategory(type){
        sessionStorage.setItem("ChartType_MostSize", type);
        location.reload();
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
            <div className='custom-tbody' style={{padding:"6px"}}>
                <h6 className='text-white'>Most Produced Size</h6>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            //Category type filter
                            items2.map((val, i, index) => {
                                if(val.CategoryName == sessionStorage.getItem("ChartType_MostSize")){
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
                        <li>
                            <a className="dropdown-item">
                                <label className='input-number-label'>Chart Limit</label>
                                <input type="number" className='form-control' min="2" max="10" defaultValue={sessionStorage.getItem("ChartLimit_MostSize")} onBlur={(e)=> setLimit(e.target.value)}></input>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="BalanceChart me-4">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="donut"
                        height="300"
                    />
                </div>
            </div>
        );
    }
}
  