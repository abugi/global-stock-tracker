import { StockAutocomplete } from '../components/StockAutocomplete'
import { StockList } from '../components/StockList'
import {NotificationToast} from '../components/NotificationToast'

export const StockOverviewPage = () => {
    return (
        <main className='grid place-items-center py-32 relative'>
            <NotificationToast />
            <StockAutocomplete />
            <StockList />
        </main>
    )
}