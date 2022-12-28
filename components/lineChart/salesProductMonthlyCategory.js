import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SalesProductMonthlyCategory() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/sales/monthly/category")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    function getSeries(val,cat){
        let catSeries = [];
        val.forEach(e => {
            if(cat == "Bikes"){ 
                catSeries.push(parseInt(e.Total_Bikes));
            } else if(cat == "Components"){ 
                catSeries.push(parseInt(e.Total_Components));
            } else if(cat == "Clothing"){ 
                catSeries.push(parseInt(e.Total_Clothing));
            } else if(cat == "Accessories"){ 
                catSeries.push(parseInt(e.Total_Accessories));
            } else {
                catSeries.push(parseInt(e.Total_Bikes));
            }
        });
        return catSeries;
    }

    function getCategory(val){
        let catData = [];
        val.forEach(e => { 
            catData.push(e.Month_name);
        });
        return catData;
    }

    chart = {
        series: [
            {
                name: "Bikes",
                data: getSeries(data, "Bikes")
            },
            {
                name: "Components",
                data: getSeries(data, "Components")
            },
            {
                name: "Clothing",
                data: getSeries(data, "Clothing")
            },
            {
                name: "Accessories",
                data: getSeries(data, "Accessories")
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: getCategory(data),
            }
        },
    };


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
                <h6 className='text-white'>Sales Product By Category</h6>
                <div className="BalanceChart me-4">
                    <div className="mixed-chart">
                        <Chart
                            options={chart.options}
                            series={chart.series}
                            type="line"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
  