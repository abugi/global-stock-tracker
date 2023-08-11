import { useState, useEffect, useContext } from 'react'
import WatchListContext from '../context/WatchListContex'
import axios from '../APIs/finnhub'


export const StockData = ({ symbol }) => {
  const {updateServerErrorMessage} = useContext(WatchListContext)
  const [stockData, setStockData] = useState()

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await axios.get("/stock/profile2", {
          params: {
            symbol
          }
        })

        if (isMounted) {
          setStockData(response.data)
        }
      } catch (error) {
        updateServerErrorMessage(error.response.data.error)
      }
    }
    fetchData()
    return () => (isMounted = false)
  }, [symbol])

  return <div>
    {stockData && (

      <section role="table" className="grid grid-cols-3 gap-10 text-sm bg-white rounded-md shadow-md border border-gray-200 p-4 mt-6">
        <div role="row" className="col">
          <div>
            <span className="font-semibold capitalize">name: </span>
            {stockData.name}
          </div>
          <div className='my-1'>
            <span className="font-semibold capitalize">country: </span>
            {stockData.country}
          </div>
          <div>
            <span className="font-semibold capitalize">ticker: </span>
            {stockData.ticker}
          </div>
        </div>
        <div role="row" className="col">
          <div>
            <span className="font-semibold capitalize">Exchange: </span>
            {stockData.exchange}
          </div>
          <div className='my-1'>
            <span className="font-semibold capitalize">Industry: </span>
            {stockData.finnhubIndustry}
          </div>
          <div>
            <span className="font-semibold capitalize">IPO: </span>
            {stockData.ipo}
          </div>
        </div>
        <div role="row" className="col">
          <div>
            <span className="font-semibold capitalize">MarketCap: </span>
            {stockData.marketCapitalization}
          </div>
          <div className='my-1'>
            <span className="font-semibold capitalize">Shares Outstanding: </span>
            {stockData.shareOutstanding}
          </div>
          <div>
            <span className="font-semibold capitalize">url: </span>
            <a href={stockData.weburl}>{stockData.weburl}</a>
          </div>
        </div>
      </section>

    )
    }
  </div >
 }