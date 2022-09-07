import {useState, useEffect} from 'react'
import { useAuth } from '@hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';

const Myorder = () => {
  const { user, cart, removeFromCart, monthsToPay, setMonthsToPay } = useAuth();
  const [idBuy, setIdBuy] = useState(null);

  useEffect(()=> {
    setIdBuy(uuidv4());
    // const disneyAccounts = cart.filter(item =>)
  }, [])

  return (
    <div className='w-full flex justify-center'>
      <div className='bg-[#F1F1F1] p-4 mt-6 rounded-lg w-full max-w-[600px] flex flex-col'>
        <div className='flex flex-wrap gap-3 justify-between'>
          <h3 className='font-semibold' >No. de Orden</h3>
          <p>{ idBuy }</p>
          <form>
            <div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Myorder