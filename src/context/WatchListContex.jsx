import { createContext, useState, useEffect } from 'react'

const WatchListContext = createContext()

export const WatchListContexProvider = ({children}) => {

    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN'])

    const [serverError, setServerError] = useState('')
    
      useEffect(() => {
        localStorage.setItem('watchList', watchList)
      }, [watchList])

    const addStock = stock => {
        if(watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
          return el !== stock
        }))
      }

    const updateServerErrorMessage = (message) => {
      setServerError(message)

      setTimeout(() => setServerError(''), 4000)
    }

    return (
        <WatchListContext.Provider value={{watchList, addStock, deleteStock, serverError, updateServerErrorMessage}}>
            {children}
        </WatchListContext.Provider>
    )
}

export default WatchListContext