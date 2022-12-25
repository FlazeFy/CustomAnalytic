import React from 'react'
import { useState, useEffect } from "react"

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SubCategorySales() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

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

    function getSeries(val, mon){
        let catSeries = [];
        val.forEach(e => {
            if(mon == 1){
                catSeries.push(parseInt(e.Jan));
            } else if(mon == 2){
                catSeries.push(parseInt(e.Feb));
            } else if(mon == 3){
                catSeries.push(parseInt(e.Mar));
            } else if(mon == 4){
                catSeries.push(parseInt(e.Apr));
            } else if(mon == 5){
                catSeries.push(parseInt(e.May));
            } else if(mon == 6){
                catSeries.push(parseInt(e.Jun));
            } else if(mon == 7){
                catSeries.push(parseInt(e.Jul));
            } else if(mon == 8){
                catSeries.push(parseInt(e.Aug));
            } else if(mon == 9){
                catSeries.push(parseInt(e.Sep));
            } else if(mon == 10){
                catSeries.push(parseInt(e.Oct));
            } else if(mon == 11){
                catSeries.push(parseInt(e.Nov));
            } else if(mon == 12){
                catSeries.push(parseInt(e.Dec));
            }
        });
        return catSeries;
    }

    // function getCategory(val){
    //     let catData = [];
    //     val.forEach(e => { 
    //         catData.push(e.ProductName);
    //     });
    //     return catData;
    // }

    chart = {
        series: [
            {
                name: 'Jan',
                data: getSeries(data, 1)
            },
            {
                name: 'Feb',
                data: getSeries(data, 2)
            },
            {
                name: 'Mar',
                data: getSeries(data, 3)
            },
            {
                name: 'Apr',
                data: getSeries(data, 4)
            },
            {
                name: 'May',
                data: getSeries(data, 5)
            },
            {
                name: 'Jun',
                data: getSeries(data, 6)
            },
            {
                name: 'Jul',
                data: getSeries(data, 7)
            },
            {
                name: 'Aug',
                data: getSeries(data, 8)
            },
            {
                name: 'Sep',
                data: getSeries(data, 9)
            },
            {
                name: 'Oct',
                data: getSeries(data, 10)
            },
            {
                name: 'Nov',
                data: getSeries(data, 11)
            },
            {
                name: 'Dec',
                data: getSeries(data, 12)
            }
        ],
        options: {
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                donut: {
                    size: 200
                }
            }
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='custom-tbody' style={{padding:"6px"}}>
                <h6 className='text-white'>Selected Category : {sessionStorage.getItem("ProductSubcategory")}</h6>
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
  