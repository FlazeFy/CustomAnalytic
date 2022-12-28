import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SubCategorySales() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];
    var valueStore = 0;

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://customanalytic.leonardhors.site/api/subcategory/sales/monthly")
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

    function getSeries(val){
        let catSeries = [];
        val.forEach(e => {
            catSeries.push({
                name: e.SubcategoryName,
                data: [e.Jan, e.Feb, e.Mar, e.Apr, e.May, e.Jun, e.Jul, e.Aug, e.Sep, e.Oct, e.Nov, e.Dec]
            });
        });

        return catSeries;
    }

    chart = {
        series: getSeries(data),
        options: {
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                heatmap: {
                    colorScale: {
                    ranges: [
                        {
                            from: -1,
                            to:0,
                            color: '#c9affa',
                            name: 'Empty',
                        },
                        {
                            from: 1,
                            to: 60,
                            color: '#bc9afc',
                            name: 'Low',
                        },
                        {
                            from: 61,
                            to: 150,
                            color: "#a87aff",
                            name: 'Medium',
                        },
                        {
                            from: 151,
                            to:500,
                            color: '#8f54ff',
                            name: 'High',
                        }
                    ]
                    }
                }
            }
        }
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
                <h6 className='text-white'>Subcategory Monthly Sales</h6>
                <div className="BalanceChart me-4">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="heatmap"
                    />
                </div>
            </div>
        );
    }
}
  