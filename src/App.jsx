import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StockOverviewPage } from './pages/StockOverviewPage'
import { StockDetailPage } from './pages/StockDetailPage'
import { WatchListContexProvider } from './context/WatchListContex'

export default function App() {
  return (
    <main className='px-20 max-w-screen-xl mx-auto'>
      <WatchListContexProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StockOverviewPage />} />
            <Route path='/detail/:symbol' element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContexProvider>
    </main>
  )
}
