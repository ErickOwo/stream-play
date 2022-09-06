import React from 'react';
import { useAuth } from '@hooks/use-auth';
import Image from 'next/image';
import Link from 'next/link';

import iconClose from '@images/icon_close.png';

import disneyLogo from '@images/disney-logo.png';
import hboLogo from '@images/hbo-max-logo.svg';
import primeLogo from '@images/prime-video-logo.svg';
import paramountLogo from '@images/Paramount-logo.png';
import starLogo from '@images/star+plus-logo.svg';

const Checkout = () => {
  const { user, cart, removeFromCart } = useAuth();

  const totalAdded = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const total = cart.reduce(reducer, 0);
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
              <div className="flex">
                <figure className="md:w-[100px] w-[70px] m-2">
                  <Image width="100%" height="80%" src={item.code == 0 ? disneyLogo : item.code == 1 ? hboLogo : item.code == 2 ? primeLogo : item.code == 3 ? paramountLogo : starLogo} />
                </figure>
                <div className="md:min-w-[195px] min-w-[50px] px-5 pt-7">
                  <p>{item.code == 0 ? 'Disney+' : item.code == 1 ? 'HBO MAX' : item.code == 2 ? 'Prime Video' : item.code == 3 ? 'Paramount+' : 'Star+'}</p>
                  <p className="text-sm">{`Q. ${item.price}.00`}</p>
                </div>
                <button className="md:w-[20px] w-[16px] ml-auto mr-3">
                  <Image width="35px" height="35px" src={iconClose} alt="close" onClick={() => handleRemove(item.id)} />
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
        <Link href="/checkout">
          <button
            onClick={() => {
              setToggleCart(false);
              setDropDown(false);
            }}
            className="text-center py-4 rounded-lg bg-green-500 font-semibold tracking-widest text-white text-lg"
          >
            Comprar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
