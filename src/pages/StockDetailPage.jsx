import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../APIs/finnhub'
import StockChart from '../components/StockChart'
import { StockData } from '../components/StockData'

const formatData = (data) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index])
      }
    })
}

export const StockDetailPage = () => {

    const {symbol} = useParams()
    const [chartData, setChartData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)
            let oneDay

            if (date.getDay() === 6) {
                oneDay = currentTime - 2 * 24 * 60 * 60;
            } else if (date.getDay() === 0) {
                oneDay = currentTime - 3 * 24 * 60 * 60;
            } else {
                oneDay = currentTime - 24 * 60 * 60;
            }
            const oneWeek = currentTime - 7 * 24 * 60 * 60
            const oneYear = currentTime - 365 * 24 * 60 * 60

            const makeAPICall = (from, to, resolution) => {
                return axios.get("/stock/candle", {
                    params: {
                      symbol,
                      from,
                      to,
                      resolution
                    }
                })
            }

            try{
                const responses = await Promise.all([
                    makeAPICall(oneDay, currentTime, 30), 
                    makeAPICall(oneWeek, currentTime, 60), 
                    makeAPICall(oneYear, currentTime, 'W')
                ])

                  setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                  })
           }catch(error){
            console.log(error)
           }
        }

        fetchData()
    }, [symbol])

    return (
        <div className='py-24'>
            {chartData && (
                <>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol} />
                </>
            )}
        </div>
    )
}