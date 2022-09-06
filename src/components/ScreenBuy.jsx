import React from 'react'
import Image from 'next/image'
import { useAuth } from '@hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';


const ScreenBuy = ({ image, price, bgColor, color, width, height, code}) => {
  const { addToCart } = useAuth();

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

  return (
    <div className={`md:mt-20 mx-auto max-w-[560px] w-full lg:h-[308px] h-[300px] relative flex rounded-md`}
    style={{backgroundColor: bgColor}} >
      <div className={`lg:w-[190px] w-[120px] absolute md:left-10 left-3 top-[70px] lg:top-[50px]`}>
      <Image src={image} width={width} height={height} />
      </div>
      <div className='absolute md:right-20 right-4 top-[82px] lg:top-[115px] text-2xl md:text-[40px] p-2 font-PT tracking-[2px]' 
      style={{color}} >
      Q. {price}.00
      </div>
      <button 
        className='bg-green-600 hover:bg-green-500 text-white mx-auto self-end mb-10 px-3 py-2 rounded-2xl select-none'
        onClick={handleCart}  >
        Agregar al carrito
      </button>
    </div> 
  )
}

export default ScreenBuy