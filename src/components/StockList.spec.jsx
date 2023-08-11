import {render, screen, within, act, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { StockList } from './StockList'
import { WatchListContexProvider } from '../context/WatchListContex'


describe('Stock List', () => {
    function renderComponent() {
        return render(
            <WatchListContexProvider>
                <BrowserRouter>
                    <StockList />
                </BrowserRouter>
            </WatchListContexProvider>
        )
    }

    test('should render table element', () => {
        renderComponent()

        const tableElement = screen.getByRole('table')

        expect(tableElement).toBeInTheDocument()
    })

    test('should render list of stocks', async () => {
        renderComponent()

        const stockItem = await screen.findByTestId('stock-item-0')

        expect(stockItem).toBeInTheDocument()

        const stockList = await screen.findAllByRole('row')

        expect(stockList).toHaveLength(4)
    })

    test('should delete stock item on click of delete button', async () => {
        renderComponent()

        userEvent.setup()

        const stockItem = await screen.findByTestId('stock-item-1')
        expect(stockItem).toBeInTheDocument()

        const buttonWrapper = within(stockItem).getByRole('cell', {name: 'Delete'})

        expect(buttonWrapper).toBeInTheDocument()

        const deleteButton = within(buttonWrapper).getByRole('button', {name: 'Delete'})

        expect(deleteButton).toBeInTheDocument()

        await userEvent.click(deleteButton)

        const stockList = screen.getAllByRole('row')

        await waitFor(() => expect(stockList).toHaveLength(3))
    })
})