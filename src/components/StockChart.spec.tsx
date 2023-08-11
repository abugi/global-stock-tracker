import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { WatchListContexProvider } from '../context/WatchListContex'
import StockChart from './StockChart'

describe('StockChart', () => {
    const chartData = {
        day: [{x: 1678802400000, y: 94}],
        week: [{x: 1678284000000, y: 92}],
        year: [{x: 1647302400000, y: 161}]
      }

    function renderComponent() {
        return render(
            <WatchListContexProvider>
                <BrowserRouter>
                    <StockChart chartData={chartData} symbol='GOOGL' />
                </BrowserRouter>
            </WatchListContexProvider>
        )
    }

    test('should render stock detail by day', () => {
        renderComponent()

        const dayButton = screen.getByRole('button', {name: '24h'})
        const weekButton = screen.getByRole('button', {name: '7d'})
        const yearButton = screen.getByRole('button', {name: '1y'})

        expect(dayButton).toBeInTheDocument()
        expect(dayButton).toHaveClass('bg-blue-500')
        expect(dayButton).toHaveClass('text-white')
        expect(weekButton).not.toHaveClass('bg-blue-500')
        expect(weekButton).toHaveClass('text-blue-500')
        expect(yearButton).not.toHaveClass('bg-blue-500')
        expect(yearButton).toHaveClass('text-blue-500')
    })

    test('should render stock detail by week', async () => {
        renderComponent()

        const dayButton = screen.getByRole('button', {name: '24h'})
        const weekButton = screen.getByRole('button', {name: '7d'})
        const yearButton = screen.getByRole('button', {name: '1y'})

        expect(weekButton).toBeInTheDocument()

        await userEvent.click(weekButton)

        expect(weekButton).toHaveClass('bg-blue-500')
        expect(weekButton).toHaveClass('text-white')
        expect(dayButton).not.toHaveClass('bg-blue-500')
        expect(dayButton).toHaveClass('text-blue-500')
        expect(yearButton).not.toHaveClass('bg-blue-500')
        expect(yearButton).toHaveClass('text-blue-500')
    })

    test('should render stock detail by year', async () => {
        renderComponent()

        const dayButton = screen.getByRole('button', {name: '24h'})
        const weekButton = screen.getByRole('button', {name: '7d'})
        const yearButton = screen.getByRole('button', {name: '1y'})

        expect(yearButton).toBeInTheDocument()

        await userEvent.click(yearButton)

        expect(yearButton).toHaveClass('bg-blue-500')
        expect(yearButton).toHaveClass('text-white')
        expect(dayButton).not.toHaveClass('bg-blue-500')
        expect(dayButton).toHaveClass('text-blue-500')
        expect(weekButton).not.toHaveClass('bg-blue-500')
        expect(weekButton).toHaveClass('text-blue-500')
    })
})