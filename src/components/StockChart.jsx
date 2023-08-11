import Chart from 'react-apexcharts'
import { useState } from "react"

export default ({chartData, symbol}) => {
    const [dateFormat, setDateFormat] = useState("24h")
    const {day, week, year} = chartData

    const determineTimeFormat = () => {
        switch (dateFormat) {
          case "24h":
            return day
          case "7d":
            return week
          case "1y":
            return year
          default:
            return day
        }
    }

    const renderButtonSelect = (button) => {
        const classes = "rounded-md py-1 mx-3 w-10 text-sm "
        if (button === dateFormat) {
          return classes + "bg-blue-500 text-white"
        } else {
          return classes + "border border-blue-500 text-blue-500"
        }
      }

    const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? "#26C281" : "#ed3419"

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px'
            }
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
              }
        },
        tooltip: {
            x: {
              format: "MMM dd HH:MM"
            }
          }
    }

    const series = [{
        name: symbol,
        data: determineTimeFormat()
    }]

    return (
        <div className='my-12 bg-white shadow-md'>
            {process.env.NODE_ENV != 'test' && <Chart options={options} series={series} type="area" width="100%" />}
            <div className='py-6'>
                <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
                <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
                <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1y</button>
            </div>
        </div>
    )
}