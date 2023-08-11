import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../APIs/finnhub'
import { FiArrowUp } from "react-icons/fi"
import WatchListContext from '../context/WatchListContex'
import '../App.css'

export const StockList = () => {
    const {watchList, deleteStock, updateServerErrorMessage} = useContext(WatchListContext)

    const [stocks, setStocks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true // to ensure that component has not been unmounted

        const fetchData = async () => {
            try{
                const responses = await Promise.all(watchList.map(async stock => {
                    const response = await axios.get(`/quote?symbol=${stock}`)
                    return {
                        data: response.data,
                        symbol: stock
                    }
                }))

                if(isMounted) {
                    setStocks(responses)
                }
            }catch(error) {
                updateServerErrorMessage(error.response.data.error)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [watchList])

    const changeColor = (data) => data < 0 ? 'text-red-600' : 'text-green-600'
    const renderIcon = data => data < 0 ? 'rotate-180' : 'rotate-0'

    const displayStockDetail = (symbol) => {
        navigate(`/detail/${symbol}`)
    }

    return (
        <table className="table-auto w-full text-center text-sm">
            <thead>
                <tr className='border-b-2 border-slate-300'>
                    <th className='py-3'>Name</th>
                    <th>Last</th>
                    <th>chg</th>
                    <th>chg%</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Open</th>
                    <th>PClose</th>
                </tr>
            </thead>
            <tbody>
                    {
                        stocks.map((stock, index) => (
                            <tr data-testid={`stock-item-${index}`} className='hover:bg-slate-100 border-b border-slate-200 cursor-pointer table-row' key={stock.symbol} onClick={() => displayStockDetail(stock.symbol)}>
                                <td className='font-medium py-4'>
                                    <Link to={`/detail/${stock.symbol}`}>
                                    {stock.symbol}
                                    </Link>
                                </td>
                                <td>{stock.data.c}</td>
                                <td className={`mr-2 ${changeColor(stock.data.d)}`}>
                                    <span>{stock.data.d}</span>
                                    <FiArrowUp className={`${renderIcon(stock.data.dp)} inline-block ml-2 align-baseline`} />
                                </td>
                                <td className={`flex items-center justify-center py-4 mr-2 ${changeColor(stock.data.dp)}`}>
                                    <span>{stock.data.dp}</span>
                                    <FiArrowUp className={`${renderIcon(stock.data.dp)} inline-block ml-2 align-baseline`} />
                                </td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td className='relative'>
                                    {stock.data.pc}
                                    {/* Code that toggles button display is located in App.css file */}
                                    <button className='bg-red-600 text-white text-xs rounded-md py-1 px-2 absolute -right-6 top-4 delete-button' onClick={e => {
                                        e.stopPropagation()
                                        deleteStock(stock.symbol)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    )
}