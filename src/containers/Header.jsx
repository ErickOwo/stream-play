import { useState } from 'react'
import { useAuth } from '@hooks/use-auth';
import Link from 'next/link';

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <header className='fixed top-0 w-full h-[80px] pt-2 px-4 bg-black z-20 flex justify-end items-center'>
      { !user ? <>
          <button 
            className=' border text-white border-white rounded-md h-12 w-20 relative' 
            onClick={()=> setDropDown(!dropDown)} >
            Cuenta        
          </button>
          {
            dropDown ? <ul className='absolute bg-white text-black right-0 p-2 w-[150px] cursor-auto flex flex-col mt-[145px] mr-4 border border-black'>
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
            className={`border-white text-white p-2 border rounded-full w-10 h-10 `} 
            onClick={()=> setDropDown(!dropDown)} >
              {user.name[0]}        
          </button>
          {
            dropDown ? <ul className='absolute bg-white text-black right-0 p-2 w-[150px] cursor-auto flex flex-col mt-[165px] mr-4'> 
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
    </header>
  )
}

export default Header