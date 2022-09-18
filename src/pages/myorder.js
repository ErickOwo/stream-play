import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';
import Order from '@components/Order';

const Myorder = () => {
  const { user, cart, removeFromCart, monthsToPay, setMonthsToPay, streamDisney, streamHBO, streamPrime, streamParamount, streamStar } = useAuth();
  const [idBuy, setIdBuy] = useState(null);

  useEffect(() => {
    setIdBuy(uuidv4());
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#F1F1F1] p-4 mt-6 rounded-lg w-full max-w-[600px] flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <h3 className="font-semibold">No. de Orden</h3>
          <p>{idBuy}</p>
        </div>
        <div>
          <div className="grid gap-2 grid-cols-4 md:grid-cols-7 items-end">
            <h3 className="font-semibold">Cuentas</h3>
            <h4 className="font-semibold">Cantidad</h4>
            <h4 className="font-semibold hidden md:flex">Precio</h4>
            <h4 className="font-semibold">Meses</h4>
            <h4 className="font-semibold hidden md:flex">SubTotal</h4>
            <h4 className="font-semibold hidden md:flex">Descuento</h4>
            <h4 className="font-semibold">Total</h4>
            <Order title="Disney+:" quantity={streamDisney.length} months={monthsToPay} price={25} />
            <Order title="HBO MAX:" quantity={streamHBO.length} months={monthsToPay} price={25} />
            <Order title="Prime Video:" quantity={streamPrime.length} months={monthsToPay} price={25} />
            <Order title="Paramount+:" quantity={streamParamount.length} months={monthsToPay} price={25} />
            <Order title="Star+:" quantity={streamStar.length} months={monthsToPay} price={25} />
          </div>
        </div>
        <form></form>
      </div>
    </div>
  );
};

export default Myorder;
