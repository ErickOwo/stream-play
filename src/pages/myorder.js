import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';
import Order from '@components/Order';

const Myorder = () => {
  const { user, cart, removeFromCart, monthsToPay, setMonthsToPay, streamDisney, streamHBO, streamPrime, streamParamount, streamStar, bank, setBankFunction } = useAuth();
  const [idBuy, setIdBuy] = useState(null);

  const totalAdded = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    let total = cart.reduce(reducer, 0);
    if (monthsToPay == 2) return total * monthsToPay - cart.length * 10;
    else if (monthsToPay == 4) return total * monthsToPay - cart.length * 40;
    return total;
  };

  useEffect(() => {
    setIdBuy(uuidv4());
  }, []);

  const handleSelection = (e) => {
    setBankFunction(e.target.value);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#F1F1F1] p-4 md:my-6 rounded-lg w-full max-w-[600px] flex flex-col gap-3">
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
          <form>
            <div className="flex mt-6 justify-between md:text-3xl text-xl">
              <h4 className="font-semibold">Total a pagar</h4>
              <p className="text-stone-800 font-bold">{`Q. ${totalAdded()}.00`}</p>
            </div>
            <h3 className="mt-6 font-semibold text-xl text-orange-600">Formas de Pago</h3>
            <div className="mt-2 flex flex-col gap-2">
              <label htmlFor="bank" className="font-semibold" defaultValue={bank}>
                Deposito o Transferencia Bancaria
              </label>
              <select id="bank" onChange={handleSelection} className="outline-none bg-black text-white p-1">
                <option value={0}>Banrural</option>
                <option value={1}>Bantrab</option>
                <option value={2}>Banco Industrial</option>
              </select>
              <div className="bg-[#D5D5D5] p-2 rounded-lg">
                {bank == 1 ? (
                  <div>
                    <h3 className="text-pink-700 text-xl font-bold">Cuenta Monetaria Bantrab</h3>
                    <p className="text-lg">No. 2860216878</p>
                    <p className="flex flex-wrap md:gap-2">
                      A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                    </p>
                  </div>
                ) : bank == 2 ? (
                  <div>
                    <h3 className="text-blue-700 text-xl font-bold">Cuenta de Ahorro BI</h3>
                    <p className="text-lg">No. 0770692</p>
                    <p className="flex flex-wrap md:gap-2">
                      A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-green-800 text-xl font-bold">Cuenta de Ahorro Banrural</h3>
                    <p className="text-lg">No. 4314151198</p>
                    <p className="flex flex-wrap md:gap-2">
                      A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                    </p>
                  </div>
                )}
              </div>
              <p className="font-semibold mt-2">Al realizar el Deposito tomarle fóto. Si ha sido Transferencia Bancaria tomarle captura de la transferencia bancaria y agregarla:</p>
              <label className="my-2 w-full h-[80px] bg-slate-800 rounded-lg flex justify-center items-center text-lg text-white cursor-pointer" htmlFor="image">
                Añadir imagen
              </label>
              <input accept="image/*" type="file" id="image" className="hidden" name="image" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myorder;
