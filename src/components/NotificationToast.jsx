import { useContext } from 'react'
import WatchListContext from '../context/WatchListContex'
import { FiX } from 'react-icons/fi'

export const NotificationToast = () => {
    const {serverError} = useContext(WatchListContext)
    return (<div>
        {
         serverError && (<main className='w-56 py-3 px-3 rounded-lg bg-red-200 text-red-600 flex items-center fixed right-28 top-32'>
                <FiX className='cursor-pointer w-6' />
                <span className='ml-3 text-[15px]'>{serverError}</span>
            </main>)
        }
    </div>
    )
}