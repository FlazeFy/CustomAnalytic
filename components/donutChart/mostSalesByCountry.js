import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function MostSalesByCountry() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/subcategory/"+sessionStorage.getItem("ProductSubcategoryKey")+"/products/sales/country/"+sessionStorage.getItem("ChartLimit_MostSalesCountry"))
        .then(res => res.json())
            .then(
            (result) => {
                //Default config
                if(sessionStorage.getItem("ChartLimit_MostSalesCountry") == null){
                    sessionStorage.setItem("ChartLimit_MostSalesCountry", "10");
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

    function getChart(len){
        if(len != 0){
            function getSeries(val){
                let catSeries = [];
                val.forEach(e => { 
                    const example = e.total;

                    const result = example ? example.toString() : '';
                    catSeries.push(parseInt(result));
                });
                return catSeries;
            }
        
            function getCategory(val){
                let catData = [];
                val.forEach(e => { 
                    catData.push(e.Country);
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
            
            
            return (
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={chart.options}
                            series={chart.series}
                            type="donut"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <h5 className='text-white'>No Item Available</h5>
                </div>
            );
        }
    }

    //Chart filter and config
    function setLimit(limit){
        sessionStorage.setItem("ChartLimit_MostSalesCountry", limit);
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
                <h6 className='text-white'>Selected Category : {sessionStorage.getItem("ProductSubcategory")}</h6>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a className="dropdown-item">
                                <label className='input-number-label'>Chart Limit</label>
                                <input type="number" className='form-control' min="2" max="10" defaultValue={sessionStorage.getItem("ChartLimit_MostSalesCountry")} onBlur={(e)=> setLimit(e.target.value)}></input>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="BalanceChart me-4">
                    {getChart(data.length)}
                </div>
            </div>
        );
    }
}
  