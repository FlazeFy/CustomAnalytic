import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function MostStyle() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/product/style/"+sessionStorage.getItem("ChartType_MostStyle"))
        .then(res => res.json())
            .then(
            (result) => {
                //Default config
                if(sessionStorage.getItem("ChartType_MostStyle") == null){
                    sessionStorage.setItem("ChartType_MostStyle", "Bikes");
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
            catData.push(e.ProductStyle);
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
    function setCategory(type){
        sessionStorage.setItem("ChartType_MostStyle", type);
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
                <h6 className='text-white'>Most Produced Style</h6>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            //Category type filter
                            items2.map((val, i, index) => {
                                if(val.CategoryName == sessionStorage.getItem("ChartType_MostStyle")){
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
  