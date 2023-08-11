import { useState, useEffect, useContext } from 'react'
import axios from '../APIs/finnhub'
import WatchListContext from '../context/WatchListContex'

export const StockAutocomplete = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const {addStock, updateServerErrorMessage} = useContext(WatchListContext)

    const handleInputChange = event => {
        setSearchTerm(event.target.value)
    }

    const handleStockSelect = stock => {
      addStock(stock)
      setSearchResult([])
      setSearchTerm('')
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/search?q=${searchTerm}`)
            setSearchResult(response.data.result)
          } catch (error) {
            updateServerErrorMessage(error.response.data.error)
          }
        }

        searchTerm.length > 0 ? fetchData() : setSearchResult([])
    }, [searchTerm])

    return (
      <div className="w-[350px] rounded-md border border-gray-300 px-3 py-2 shadow-sm mb-12 relative">
        <label htmlFor="name" className="block text-sm font-medium">
          Search:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full border-0 placeholder-gray-500 sm:text-sm focus:outline-none py-2"
          placeholder="Enter company name..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <ul className={`absolute top-full left-0 w-full h-48 bg-white border border-slate-300 overflow-y-scroll overscroll-y-contain z-50 rounded-md ${searchResult.length ? 'block' : 'hidden'}`}>
            {
                searchResult.map((result, index) => {
                    return  <li key={result.symbol} data-testid={`stock-item-${index}`} className='flex items-center text-[13px]    py-1 px-3 hover:bg-slate-200 cursor-pointer' onClick={() => handleStockSelect(result.symbol)}>
                                <div>{result.description}</div>
                                <div className='font-medium ml-2'>({result.symbol})</div>
                            </li>
                })
            }
        </ul>
      </div>
    )
  }