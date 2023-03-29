import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { postData } from '@api/requests';
import endPoints from '@api/index';

const ChangePassword = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      password: formData.get('password'),
    };

    if (!/.{8,1024}/.test(data.password)) {
      setMessage({
        text: 'La contraseña debe contener un minimo de 8 caracteres',
        type: 'error',
      });
      return;
    }
    if (formData.get('confirmPassword') !== data.password) {
      setMessage({
        text: 'Las contraseñas no coinciden',
        type: 'error',
      });
      return;
    }

    postData(endPoints.users.changePassword + `/${router.query.id}`, data)
      .then((res) => {
        setMessage(res);
        setTimeout(() => {
          router.push('/login');
        }, 1300);
      })
      .catch((e) => {
        if(e.response) setMessage({text: e.response.data.error, type: 'error'})
        else setMessage({ text: 'Error en la API', type: 'error' });
      });
  };

  return (
    <div className="flex flex-col items-center bg-black md:bg-white min-h-screen -mt-[63px] pt-[63px] md:pt-[103px]">
      <form className="bg-black/90 text-white flex flex-col p-3 w-full md:w-[422px] md:p-6 gap-2" ref={formRef} onSubmit={handleSubmit}>
        <h3 className="text-xl ">Cambiar Contraseña.</h3>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password">Ingrese Nueva Contraseña</label>
          <input type="password" name="password" id="password" className="text-black p-1"></input>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirme Nueva Contraseña</label>
          <input type="password" name="confirmPassword" id="confirmPassword" className="text-black p-1"></input>
        </div>
        <div className="md:h-[70px] h-[90px] mt-1">{message ? <p className={`${message.type == 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</p> : null}</div>
        <button className="bg-slate-600 border border-white mt-2 py-2 hover:bg-slate-500">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;
