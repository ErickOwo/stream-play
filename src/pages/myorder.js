import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';
import Order from '@components/Order';
import Select from 'react-select';
import { useRouter } from 'next/router';

import { postMultimedia } from '@api/requests';
import endPoints from '@api/index';

const Myorder = () => {
  const formRef = useRef();
  const { user, cart, monthsToPay, streamDisney, streamHBO, streamPrime, streamParamount, streamStar, streamNetflix, bank, setBankFunction, emptyCart } = useAuth();
  const [idBuy, setIdBuy] = useState(null);
  const [message, setMessage] = useState(null);
  const [imgAdded, setImageAdded] = useState(false);

  const router = useRouter();

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
    setBankFunction(e.value);
  };

  const handleImg = (e) => {
    if (e.target.value == '') setImageAdded(false);
    else setImageAdded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {
      user,
      orderNumber: idBuy,
      disneyProfiles: streamDisney.length,
      hboProfiles: streamHBO.length,
      primeProfiles: streamPrime.length,
      paramountProfiles: streamParamount.length,
      starProfiles: streamStar.length,
      netflixProfiles: streamNetflix.length,
      months: monthsToPay,
      bankCode: bank,
    };

    formData.append('info', JSON.stringify(data));

    if (formData.get('media').size == 0) {
      setMessage({ type: 'error', text: 'Por favor agregue la imagen del pago antes de presionar enviar' });
      return;
    }

    postMultimedia(endPoints.orders.api, formData)
      .then((res) => {
        setMessage({ text: 'Pedido realizado con éxito', type: 'success' });
        emptyCart();

        setTimeout(() => {
          router.push('/orders');
          setMessage(null);
        }, 1300);
      })
      .catch((e) => {
        if (e?.response?.data?.message) {
          setMessage({ text: e?.response?.data?.message, type: 'error' });
        } else setMessage({ text: 'Fallo en la API', type: 'error' });
      });
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
            <Order title="Netflix+:" quantity={streamNetflix.length} months={monthsToPay} price={60} />
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex mt-6 justify-between md:text-3xl text-xl">
              <h4 className="font-semibold">Total a pagar</h4>
              <p className="text-stone-800 font-bold">{`Q. ${totalAdded()}.00`}</p>
            </div>
            <h3 className="mt-6 font-semibold text-xl text-orange-600">Formas de Pago</h3>
            <div className="mt-2 flex flex-col gap-2">
              <label htmlFor="bank" className="font-semibold" defaultValue={bank}>
                Deposito o Transferencia Bancaria
              </label>
              <Select
                id="bank"
                onChange={handleSelection}
                className="outline-none p-1"
                options={[
                  { value: 0, label: 'Banrural' },
                  { value: 1, label: 'Bantrab' },
                  { value: 2, label: 'Banco Industrial' },
                ]}
              ></Select>
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
              <p className="font-semibold mt-2">
                Al realizar el <b className="font-bold">Deposito</b> tomale fóto a tu boleta de pago. Si ha sido <b className="font-bold">Transferencia Bancaria</b> manda una captura de pantalla de la
                transferencia bancaria y agregala:
              </p>
              <label
                className={`my-2 w-full h-[80px] ${
                  imgAdded ? 'bg-pink-800 hover:bg-pink-700' : 'bg-slate-800 hover:bg-slate-700'
                } rounded-lg flex justify-center items-center text-lg text-white cursor-pointer`}
                htmlFor="media"
              >
                {imgAdded ? 'Imagen Añadida' : 'Añadir Imagen'}
              </label>
              <input accept="image/*" type="file" id="media" className="hidden" name="media" onChange={handleImg} />
              {message ? (
                <div className={`md:h-6 h-10 ${message.type == 'error' ? 'text-red-600' : message.type == 'info' ? 'text-blue-600' : 'text-green-600'}`}>{message.text}</div>
              ) : (
                <div className="md:h-6 h-10"></div>
              )}
              <input
                onClick={() => setMessage({ text: 'Enviando pedido...', type: 'info' })}
                type="submit"
                value="Enviar Pago"
                className="bg-blue-700 hover:bg-blue-600 p-2 text-white font-semibold tracking-wider my-3 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myorder;
