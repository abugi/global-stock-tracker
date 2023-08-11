import { render, screen } from '@testing-library/react'
import {vi} from 'vitest'
import userEvent from '@testing-library/user-event'
import { StockAutocomplete } from './StockAutocomplete'
import { WatchListContexProvider } from '../context/WatchListContex'

describe('StockAutocomplete', () => {
      
    function renderComponent() {
        return render(
            <WatchListContexProvider>
                <StockAutocomplete  />
            </WatchListContexProvider>
        )
      }

  it('renders input', () => {
    renderComponent()

    const inputElement:HTMLInputElement = screen.getByRole('textbox')

    expect(inputElement).toBeInTheDocument()
  })

  it('should not render list', () => {
    renderComponent()

    const ulElement:HTMLUListElement = screen.getByRole('list')

    expect(ulElement).toBeInTheDocument()
    expect(ulElement).toHaveClass('hidden')
  })

  it('should update value as input changes', async () => {
    renderComponent()

    userEvent.setup()

    const inputValue:string = 'G'

    const inputElement:HTMLInputElement = screen.getByRole('textbox')
    
    await userEvent.type(inputElement, inputValue)

    expect(inputElement).toHaveValue(inputValue)
  })

  it('should render list of companies', async () => {
    renderComponent()

    userEvent.setup()

    const inputElement:HTMLInputElement = screen.getByRole('textbox')

    
    await userEvent.type(inputElement, 'O')

    expect(inputElement).toHaveValue('O')

    const ulElement:HTMLUListElement = screen.getByRole('list')
    expect(ulElement).toBeInTheDocument()
    expect(ulElement).toHaveClass('block')

    const listItems = await screen.findAllByRole('listitem')
    expect(listItems).toHaveLength(1)
  })

  it('should render stock detail', async () => {
    renderComponent()

    userEvent.setup()

    const inputElement:HTMLInputElement = screen.getByRole('textbox')
    
    await userEvent.type(inputElement, 'O')

    const listItem = await screen.findByTestId('stock-item-0')

    await userEvent.click(listItem)

    const ulElement:HTMLUListElement = screen.getByRole('list')

    expect(ulElement).toBeInTheDocument()
    expect(ulElement).toHaveClass('hidden')
  })
})