import { useRef, useState } from 'react';
import { postData } from '@api/requests';
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import endPoints from '@api/index';
import { useAuth } from '@hooks/use-auth'
import Link from 'next/link';

const FormUser = ({ signin = false }) => {
  const formRef = useRef(null);
  const [message, setMessage] = useState(null)
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  
  const handleSubmit = e =>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
    }
    if(!signin && !/[a-záéíóú]{3,260}/i.test(data.name)){
      setMessage({
        text: 'El nombre es demasiado corto o contiene caracteres invalidos',
        type: 'error'
      });
      return
    }
    if(!/[\w\.]{3,30}\+?\w{0,10}@[\w\.\-]{3,}\.\w{2,3}/i.test(data.email)){
      setMessage({
        text: 'Usuario de email invalido',
        type: 'error'
      });
      return
    }
    if(!signin && !/\+?\d{0,3}\d{4,5}[.-]?\d{4,5}[.-]?\d{0,3}/i.test(data.phone)){
      setMessage({
        text: 'Número de teléfono invalido',
        type: 'error'
      });
      return
    }
    if(!/.{8,1024}/.test(data.password)){
      setMessage({
        text: 'La contraseña debe contener un minimo de 8 caracteres',
        type: 'error'
      });
      return
    }
    if(!signin){
      if(formData.get('confirmPassword') !== data.password){
        setMessage({
          text: 'Las contraseñas no coinciden',
          type: 'error'
        });
        return
      }
    }

    if(!signin) signUp(data).then(res => {
      setMessage({text: res.message, type: 'message'});
      setTimeout(()=>{
        signin ? router.push('/') : router.push('/login');
        setMessage(null);
      },1300);
    }).catch(e=>{
      if(e?.response?.data?.error) setMessage({text: e?.response?.data?.error, type: 'error'})
      else setMessage({text: 'Error en la API', type: 'error'});
    }); 
    else signIn({email: data.email, password: data.password}).then(res => {
      if (res) {
        if (res.error) return setMessage({text: res.message, type: 'error'});
        const { access_token } = res;
        if (access_token) cookie.set('token-public-stream', access_token, { expires: 90 });
        else setMessage({text: 'Error en authenticación', type: 'error'});       
        setMessage(null);
        router.push('/');
      }
    }).catch(e => {
      if(e?.response?.data?.error) setMessage({text: e.response.data.error, type: 'error'});
      else setMessage({text: 'Error en la API', type: 'error'});
    });
  }

  return (
    <form 
      className='flex flex-col w-full max-w-[480px] bg-black p-7 md:m-6 gap-4 md:min-h-min min-h-screen'
      ref={formRef}
      onSubmit={handleSubmit}  >
      <h3 className='text-white font-bold tracking-wider text-2xl mb-2'>{
        signin ? 'Ingresa a tu cuenta' : 'Crear Cuenta'
      }</h3>
      {
        !signin ? <div className='flex flex-col gap-2'>
          <label 
            htmlFor='name'
            className='text-white font-semibold' >
              Nombre: 
          </label>
          <input 
            name='name'
            id='name'
            placeholder={true ? 'Ingrese su nombre' : null}
            className='max-w-[380px] bg-blue-600 py-1 px-2     placeholder:text-slate-300 text-white outline-none' />
        </div> : null
      }
      <div className='flex flex-col gap-2'>
        <label 
          htmlFor='email'
          className='text-white font-semibold' >
            Correo Electrónico: 
        </label>   
      <input 
        name='email'
        id='email'
        type='email'
        placeholder={true ? 'Ingrese su correo electrónico' : null}
        className='max-w-[380px] bg-blue-600 py-1 px-2 placeholder:text-slate-300 text-white outline-none' />
      </div>
      {
        !signin ? <div className='flex flex-col gap-2'>
          <label 
            htmlFor='phone'
            className='text-white font-semibold' >
              Teléfono: 
          </label>
          <input 
            name='phone'
            id='phone'
            type='number'
            placeholder={true ? 'Ingrese un número telefónico' : null}
            className='max-w-[380px] bg-blue-600 py-1 px-2     placeholder:text-slate-300 text-white outline-none' />
        </div> : null
      }
      <div className='flex flex-col gap-2'>
        <label 
          htmlFor='password'
          className='text-white font-semibold' >
            Contraseña: 
        </label>
        <input 
          name='password'
          id='password'
          type='password'
          placeholder={true ? 'Ingrese contraseña' : null}
          className='max-w-[380px] bg-blue-600 py-1 px-2 placeholder:text-slate-300 text-white outline-none' />
      </div>
      {
        !signin ? <div className='flex flex-col gap-2'>
          <label 
            htmlFor='confirmPassword'
            className='text-white font-semibold' >
              Confirmar contraseña: 
          </label>
          <input 
            name='confirmPassword'
            id='confirmPassword'
            type='password'
            placeholder={true ? 'Ingrese contraseña' : null}
            className='max-w-[380px] bg-blue-600 py-1 px-2 placeholder:text-slate-300 text-white outline-none' />
        </div> : null
      }
      {
        message ? <span className={`h-4 mb-1 ${message.type == 'error' ? 'text-yellow-400' : message.type == 'info' ? 'text-blue-400' : 'text-green-400'}`}>{ message.text }</span> : <span className='h-4 mb-1'></span> 
      }
      {
        signin ? <>
          {/* <Link
            href='/recoverpassword' >
            <p className='text-blue-400 text-sm md:text-m cursor-pointer hover:text-pink-700'>¿Olvidaste tu contraseña? <span className='underline'>Haz click aquí</span></p>
          </Link> */}
          <Link
            href='/signup' >
            <p className='text-blue-300 text-sm md:text-m cursor-pointer mb-1 hover:text-yellow-400'>¿Aún no tienes cuenta? <span className='underline'>Registrate aquí</span></p>
          </Link>
        </> : <Link
          href='login' >
          <p className='text-blue-300 cursor-pointer mb-1 hover:text-yellow-400'>¿Ya tienes cuenta? <span className='underline'>Ingresa aquí</span></p>
        </Link>
      }
      <button className='bg-white w-40 p-2 text-blue-800 font-semibold'
       onClick={()=> setMessage({type: "info", text: 'Ingresando...'})} >
        { signin ? 'Ingresar' : 'Crear cuenta' }
      </button>
    </form>
  )
}

export default FormUser