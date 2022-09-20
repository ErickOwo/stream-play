import { useState } from 'react'
import { useAuth } from '@hooks/use-auth';
import Link from 'next/link';
import Image from 'next/image';
import iconShoppingCard from '@images/icon_shopping_cart.svg';
import {AiOutlineClose} from 'react-icons/ai';
import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa'
import { motion } from 'framer-motion';

import disneyLogo from '@images/disney-logo.png';
import hboLogo from '@images/hbo-max-logo.svg';
import primeLogo from '@images/prime-video-logo.svg';
import paramountLogo from '@images/Paramount-logo.png';
import starLogo from '@images/star+plus-logo.svg';


const Header = ({backButton}) => {
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileMenuAnimation, setMobileMenuAnimation] = useState(false);

  const { user, logOut, cart, removeFromCart, toggleCart, setToggleCart } = useAuth();
  
  const router = useRouter();

  const totalAdded = ()=>{
    const reducer = (accumulator, currentValue)=> accumulator + currentValue.price;
    const total = cart.reduce(reducer, 0);
    return total;
  };

  const handleRemove = id => {
    removeFromCart(id);
  }

  const variantsMobileMenu = {
    show: {
      opacity: 1,
      x:0,
      transition: {
        duration: .6,
      },
    },
    hidde: {
      opacity: 0.5,
      x: -280,

      transition: {
        ease: 'easeOut',
        duration: .6,
      },
      
    },
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setMobileMenuAnimation(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnimation(false);
    setTimeout(() => {
      setMobileMenu(false);
    }, 500);
  };


  return (
    <header className='fixed top-0 w-full h-[63px]  px-4 bg-black z-20 flex justify-end items-center border-b border-gray-500'>
      {
        backButton ? <Link href='/'>
          <button className='mr-auto px-3 py-1 rounded-lg font-semibold bg-white md:flex hidden'>Inicio</button>
        </Link> : null
      }
      <button 
        onClick={() => openMobileMenu()}
        className='text-white flex lg:hidden mr-auto text-3xl' >
          <FaBars />
      </button>
      {
        mobileMenu ? 
        <motion.div
          initial={{ 
            opacity: 0.5,
            x: -280
           }}
          variants={variantsMobileMenu}
          animate={mobileMenuAnimation ? 'show' : 'hidde'} 
          className='fixed top-0 left-0 w-full min-h-screen bg-black z-40 text-xl'
           >
          <button 
            onClick={() => closeMobileMenu()}
            className='text-white flex lg:hidden mr-auto text-3xl absolute right-2 m-2 p-2' >
            <FaBars />
          </button>
          {
            !user ? <ul className='text-white p-2 cursor-auto flex flex-col mt-[63px] ml-2 mr-4 gap-2 select-none'>
              <Link href='/signup'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left border-slate-500 border-b'
                  onClick={() => {
                    setMobileMenu(false);
                    setMobileMenuAnimation(false)
                  }} >
                    Crear Cuenta
                </button>
              </Link>
              <Link href='/login' >
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left border-slate-500 border-b'
                  onClick={() => {
                    setMobileMenu(false);
                    setMobileMenuAnimation(false)
                  }} >
                    Iniciar Sessión
                </button>
              </Link>
            </ul> : <ul className='text-white p-2 mt-[63px] flex flex-col gap-2'> 
              <Link href='/'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left border-b border-slate-500 ml-2 mr-4'
                  onClick={() => {
                    setMobileMenu(false);
                    setMobileMenuAnimation(false)
                  }} >
                    { 
                      user.name.split(' ').map((name, index) =>{
                        if(
                          index == 0 
                          || name != 'de' && index == 1 && user.name.split(' ').length < 3
                          || name != 'de' && index == 2 && user.name.split(' ').length < 5
                          || name == 'de' && index == 1 && user.name.split(' ').length > 2
                          || name == 'de' && index == 2 && user.name.split(' ').length > 3
                          || index == 3 && user.name.split(' ').length > 4) return name + ' ';                            
                      })
                    }
                </button>
              </Link>
              <Link href='/'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left border-b border-slate-500 ml-2 mr-4'
                  onClick={() => {
                    setMobileMenu(false);
                    setMobileMenuAnimation(false)
                  }} >
                    Inicio
                </button>
              </Link>
              <Link href='/orders'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left border-b border-slate-500 ml-2 mr-4'
                  onClick={() => {
                    setMobileMenu(false);
                    setMobileMenuAnimation(false)
                  }} >
                    Pedidos
                </button>
              </Link>
              <button 
                className='p-2 text-left absolute bottom-10 ml-2'
                onClick={() => {
                  logOut(); 
                  setMobileMenu(false);
                  setMobileMenuAnimation(false)
                }} >
                  Cerrar Sessión
              </button>
            </ul>
          }
        </motion.div> : null
      }
      { !user ? <>
          <button 
            className='border text-white border-white rounded-md h-12 w-20 relative lg:inline-block hidden' 
            onClick={()=> {
              setDropDown(!dropDown)
              setToggleCart(false)
            }} >
            Cuenta        
          </button>
          {
            dropDown ? <ul className='absolute bg-white text-black right-0 p-2 w-[150px] cursor-auto flex flex-col mt-[160px] mr-4 border border-gray-500 rounded-md select-none'>
              <Link href='/signup'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left'
                  onClick={() => setDropDown(false)} >
                    Crear Cuenta
                </button>
              </Link>
              <Link href='/login' >
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left'
                  onClick={() => setDropDown(false)} >
                    Iniciar Sessión
                </button>
              </Link>
            </ul> : null
          }
        </> : <>
          <button 
            className={`border-white text-white p-2 border rounded-full w-10 h-10 hidden lg:inline-block select-none`} 
            onClick={()=> {
              setDropDown(!dropDown);
              setToggleCart(false);
            }} >
              { user ? user?.name[0] : null}        
          </button>
          {
            dropDown ? <ul className='absolute bg-white text-black right-0 p-2 min-w-[150px] cursor-auto flex flex-col top-[63px] mr-4 border border-gray-500 rounded-md'> 
              <Link href='/'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left'
                  onClick={() => setDropDown(false)} >
                    { 
                      user.name.split(' ').map((name, index) =>{
                        if(
                          index == 0 
                          || name != 'de' && index == 1 && user.name.split(' ').length < 3
                          || name != 'de' && index == 2 && user.name.split(' ').length < 5
                          || name == 'de' && index == 1 && user.name.split(' ').length > 2
                          || name == 'de' && index == 2 && user.name.split(' ').length > 3
                          || index == 3 && user.name.split(' ').length > 4) return name + ' ';                            
                      })
                    }
                </button>
              </Link>
              <Link href='/orders'>
                <button 
                  className='p-2 hover:bg-slate-400/30 text-left'
                  onClick={() => setDropDown(false)} >
                    Pedidos
                </button>
              </Link>
              <button 
                className='p-2 hover:bg-slate-400/30 text-left'
                onClick={() => {
                  logOut(); 
                  setDropDown(false);
                }} >
                  Cerrar Sessión
              </button>
            </ul> : null
          }
        </>
      }
          {
            router.pathname == '/' ? <button 
            className={`border-white text-black p-2 border rounded-full w-10 h-10 ml-4 relative ${toggleCart ? 'bg-blue-500' : 'bg-white'}`}
            style={router.pathname == '/' ? null : {cursor: 'auto'}} 
            onClick={()=> {
              if(router.pathname == '/') setToggleCart(!toggleCart);
              setDropDown(false);
            }} >
              <Image 
              width='25px' 
              height='25px'
              src={iconShoppingCard} 
              alt='shopping cart' />
              {cart.length > 0 ? <div className='absolute bg-green-500 rounded-full px-2 -top-2 -left-3'>{cart.length}</div> : null}        
            </button> : null
          }
          {
            toggleCart && router.pathname == '/'  ? <div
            className='absolute bg-white text-black right-0 p-2 w-11/12 md:w-auto min-w-[150px] cursor-auto flex flex-col top-[63px] mr-4 border border-gray-500 rounded-md select-none'  >
              <div className='max-h-[300px] overflow-auto '>
              { 
                cart.length ? cart.map((item, index)=> (
                  <div className='flex' key={index}>
                    <figure className='w-[70px] m-2'>
                      <Image 
                        width='100%' 
                        height='100%'
                        src={ item.code == 0 ? disneyLogo :
                              item.code == 1 ? hboLogo :
                              item.code == 2 ? primeLogo :
                              item.code == 3 ? paramountLogo : starLogo } 
                      />
                    </figure>
                    <div className='w-full min-w-[125px] p-2'>
                      <p>{ item.code == 0 ? 'Disney+' :
                           item.code == 1 ? 'HBO MAX' :
                           item.code == 2 ? 'Prime Video' :
                           item.code == 3 ? 'Paramount+' : 'Star+' }</p>
                      <p className='text-sm'>{`Q. ${item.price}.00`}</p>
                    </div>
                    <button 
                      className='w-[20px] my-auto mr-3 text-[#2f2f2f] text-[22px]'
                      onClick={() => handleRemove(item.id)} >
                        <AiOutlineClose />
                    </button>
                  </div>
                )) : <div className='w-[246px] py-3 text-center text-gray-500'>No hay compras aún</div>
              }
              </div>
              <div className='p-3'>
                <p className='text-lg flex'>Total: <span className='ml-auto mr-1 text-md font-bold'> {`Q. ${totalAdded()}.00`} </span></p>
              </div>
              <Link href={user ? '/checkout' : '/login'}>
                <button 
                  onClick={() => {
                    setToggleCart(false);
                    setDropDown(false);
                  }} 
                  className='text-center py-4 rounded-lg bg-green-500 font-semibold tracking-widest text-white text-lg'>
                  Comprar
                </button>
              </Link>
            </div> : null
          }
    </header>
  )
}

export default Header