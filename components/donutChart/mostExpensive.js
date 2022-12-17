import React from 'react'
import { useState, useEffect } from "react"

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MostExpensive() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subcategory/"+sessionStorage.getItem("ProductSubcategoryKey")+"/products/expensive")
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

    function getChart(len){
        if(len != 0){
            function getSeries(val){
                let catSeries = [];
                val.forEach(e => { 
                    catSeries.push(parseInt(e.ProductPrice));
                });
                return catSeries;
            }
        
            function getCategory(val){
                let catData = [];
                val.forEach(e => { 
                    catData.push(e.ProductName);
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='custom-tbody' style={{padding:"6px"}}>
                <h6 className='text-white'>Selected Category : {sessionStorage.getItem("ProductSubcategory")}</h6>
                <div className="BalanceChart me-4">
                    {getChart(data.length)}
                </div>
            </div>
        );
    }
}
  