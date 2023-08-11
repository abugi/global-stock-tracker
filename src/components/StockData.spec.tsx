import {render, screen} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { WatchListContexProvider } from '../context/WatchListContex'
import {StockData} from './StockData'

describe('StockChart', () => {

    function renderComponent() {
        return render(
            <WatchListContexProvider>
                <BrowserRouter>
                    <StockData symbol='GOOGL' />
                </BrowserRouter>
            </WatchListContexProvider>
        )
    }

    test('should display Stock information below the chart', async () => {
        renderComponent()

        const stockNameElement = await screen.findByRole('table')

        expect(stockNameElement).toBeInTheDocument()
    })

    test('should display appropriate data', async () => {
        renderComponent()

        const stockDetails = await screen.findAllByRole('row')
        const stockNameElement = await screen.findByText('Alphabet Inc')

        expect(stockDetails).toHaveLength(3)
        expect(stockNameElement).toBeInTheDocument()
    })
})