import { useState } from 'react';
import { useAuth } from '@hooks/use-auth';
import Image from 'next/image';

import { AiOutlineClose } from 'react-icons/ai';

import disneyLogo from '@images/disney-logo.png';
import hboLogo from '@images/hbo-max-logo.svg';
import primeLogo from '@images/prime-video-logo.svg';
import paramountLogo from '@images/Paramount-logo.png';
import starLogo from '@images/star+plus-logo.svg';
import Link from 'next/link';

const Checkout = () => {
  const { cart, removeFromCart, monthsToPay, setMonthsToPay } = useAuth();

  const handleChange = (e) => {
    setMonthsToPay(parseInt(e.target.value));
  };

  const totalAdded = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    let total = cart.reduce(reducer, 0);
    if (monthsToPay == 2) return total * monthsToPay - cart.length * 10;
    else if (monthsToPay == 4) return total * monthsToPay - cart.length * 40;
    return total;
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] rounded-lg md:mt-4 flex flex-col bg-[#F1F1F1] p-5 select-none">
        <h3 className="text-2xl font-semibold">Mi orden</h3>
        <div className="flex flex-col mx-auto mt-9 max-h-[300px] overflow-auto">
          {cart.length ? (
            cart.map((item, index) => (
              <div className="flex" key={index}>
                <figure className="md:w-[100px] w-[70px] m-2">
                  <Image width="100%" height="80%" src={item.code == 0 ? disneyLogo : item.code == 1 ? hboLogo : item.code == 2 ? primeLogo : item.code == 3 ? paramountLogo : starLogo} />
                </figure>
                <div className="md:min-w-[195px] min-w-[50px] px-5 pt-7">
                  <p>{item.code == 0 ? 'Disney+' : item.code == 1 ? 'HBO MAX' : item.code == 2 ? 'Prime Video' : item.code == 3 ? 'Paramount+' : 'Star+'}</p>
                  <p className="text-sm">{`Q. ${item.price}.00`}</p>
                </div>
                <button className="md:w-[20px] w-[16px] ml-auto mr-3 text-[#404040] text-[32px]">
                  <AiOutlineClose />
                </button>
              </div>
            ))
          ) : (
            <div className="w-[246px] py-3 text-center text-gray-500">No hay compras aún</div>
          )}
        </div>
        <div className="p-3">
          <p className="text-lg flex">
            Total: <span className="ml-auto mr-1 text-md font-bold"> {`Q. ${totalAdded()}.00`} </span>
          </p>
        </div>
        <div className="px-3 mb-4 flex flex-col gap-1">
          <div className="flex gap-2">
            <input onChange={handleChange} className="hidden" type="radio" value="1" id="1m" name="months" />
            <label className="py-1 px-3 bg-cyan-700/10 w-full font-semibold" style={monthsToPay == 1 ? { backgroundColor: '#17BBF9' } : null} htmlFor="1m">
              1 mes
            </label>
          </div>
          <div className="flex gap-2">
            <input onChange={handleChange} className="hidden" type="radio" value="2" id="2m" name="months" />
            <label className="py-1 px-3 bg-cyan-700/10 w-full font-semibold" style={monthsToPay == 2 ? { backgroundColor: '#17BBF9' } : null} htmlFor="2m">
              2 meses (Q. 20.00 por mes) ¡Oferta!
            </label>
          </div>
          <div className="flex gap-2">
            <input onChange={handleChange} className="hidden" type="radio" value="4" id="4m" name="months" />
            <label className="py-1 px-3 bg-cyan-700/10 w-full font-semibold" style={monthsToPay == 4 ? { backgroundColor: '#17BBF9' } : null} htmlFor="4m">
              4 meses (Q. 15.00 por mes) ¡Oferta!
            </label>
          </div>
        </div>
        {!cart.length ? (
          <button className="cursor-auto text-center py-4 rounded-lg bg-green-300 font-semibold tracking-widest text-white text-lg">Comprar</button>
        ) : (
          <Link href="/myorder">
            <button className="text-center py-4 rounded-lg bg-green-500 font-semibold tracking-widest text-white text-lg">Realizar Compra</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Checkout;
