import React, { useEffect } from 'react';
import Chart from 'react-apexcharts'

// Props To Set :
// 1. height -> Size dari Chart yang akan digenerate
// 2. color [] -> Qty Element dlm Array menyesuaikan dengan jumlah varian data yang akan ditampilkan
// 3. axisX [] -> Qty Element dlm Array menyesuaikan dengan jumlah data yang ada di 1 varian series (props ini akan ditampilkan di axis X)
// 4. title -> Judul dari Chart yang akan digenerate
// 5. title_axisX -> Keterangan axis X dari Chart
// 6. title_axisY -> Keterangan axis Y dari Chart
// 7. series [] -> Data yang akan disajikan, dimana Qty Element dlm Array HARUS sama dengan color dan axisX
// 8. max_axisy -> Maximum nilai axis Y yang akan ditampilkan

// Example Use Case :
// <LineChart param={constant.trenChart}></LineChart>
// export const trenChart = {
//     height: '350px',
//     color: ['#65adda', '#f9cfa0'],
//     axisX: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Des'],
//     title: 'Tren Pesanan Mostrans (YTD)',
//     title_axisX: '',
//     title_axisY: '',
//     series: [
//         {
//             name: "GTV",
//             data: [0, 10, 20, 30, 20, 40, 50, 40, 20, 60, 70, 80]
//         },
//         {
//             name: "Test",
//             data: [10, 20, 30, 10, 50, 50, 60, 70, 80, 60, 70, 50]
//         }
//     ],
//     max_axisy: 80
// }

export const LineChart = (props) => {
    // var options = ;
    // var series = props.param.series;
    var options = {
        chart: {
            animations:{
                enabled:false
            },
            height: props.param.height,
            type: 'line',
            dropShadow: {
                enabled: false,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: props.param.color,
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: props.param.title,
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: props.param.axisX,
            title: {
                text: props.param.title_axisX
            }
        },
        yaxis: {
            title: {
                text: props.param.title_axisY
            },
            min: 0,
            max: props.param.max_axisy
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };
    return (
        <Chart height={props.param.height} options={options} series={props.param.series} type="line" />
    )
};