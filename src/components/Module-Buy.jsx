import React from 'react'
import Image from 'next/image'
import { useAuth } from '@hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';
import arrowUp from '@images/arrow-up.svg';

const ModuleBuy = ({ image, price, bgColor, color, width, height, code, quantity = 0, }) => {
  const { addToCart, deleteFromCart } = useAuth();

  const handleCart = () => {
    const date = new Date();

    const product = {
      code,
      date, 
      price, 
      id: uuidv4()
    }
    addToCart(product);
  }

  const handleDelete = () => {
    deleteFromCart(code);
  }

  return (
    <div 
      className={`max-w-[460px] w-full lg:h-[308px] h-[300px] relative flex flex-col rounded-md px-3`}
      style={{backgroundColor: bgColor}} >
        <div 
          className={`m-auto lg:w-[190px] w-[120px] md:left-10 left-3 top-[70px] lg:top-[50px]`}>
            <Image src={image} width={width} height={height} />
        </div>
        <div className='flex w-full items-center justify-between px-4 pb-2'>
          <div 
            className=' text-3xl md:text-[40px] p-2 font-PT tracking-[2px]' 
            style={{color}} >
              Q. {price}.00
          </div>
          <div className='flex flex-col mr-4 mb-2'>
            <button 
              className='select-none w-5 h-5'
              onClick={handleCart}  >
                <Image
                  src={arrowUp}
                  width='200px'
                  height='200px' />
            </button>
            <div className='h-7 text-center font-semibold text-lg'>{ quantity }</div> 
            <button 
              className='select-none h-5 w-5 transform rotate-180'
              onClick={handleDelete}  >
                <Image
                  src={arrowUp}
                  width='200px'
                  height='200px' />
            </button>
          </div>
      </div>
    </div> 
  )
}

export default ModuleBuy