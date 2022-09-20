import { useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import endPoints from '@api/index';

const Contact = () => {
  const form = useRef(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };
    if (!/.{3,80}/i.test(data.name)) setMessage({ text: 'El nombre no puede contener menos de 3 o más de 80 caracteres', type: 'error' });
    else if (!/[\w\.]{5,30}\+?\w{0,10}@[\w\.\-]{3,}\.\w{2,3}/i.test(data.email)) setMessage({ text: 'Usuario de email invalido', type: 'error' });
    else if (!/\+?\d{8,20}/i.test(data.phone)) setMessage({ text: 'Número de teléfono invalido', type: 'error' });
    else if (!/[a-z]{1,4096}/i.test(data.message)) setMessage({ text: 'El mensaje no puede contener más de 4096 caracteres', type: 'error' });
    else {
      axios
        .post(endPoints.users.api + '/mail', data, {
          Headers: {
            accept: '*/*',
            'Content-Type': 'aplication/json',
          },
        })
        .then((res) => {
          setMessage({ text: 'Mensaje enviado correctamente', type: 'success' });
        });
    }
  };

  return (
    <div className="container flex flex-wrap justify-center bg-black max-w-none">
      <form className="flex flex-col p-2 md:p-10 font-ubuntu" ref={form} onSubmit={handleSubmit}>
        <span className="text-blue-500 font-bold">Envíanos tu mensaje, nos pondremos en contacto lo antes posible.</span>
        <label htmlFor="name" className="mb-2 mt-4 font-bold text-white">
          Nombre
        </label>
        <input placeholder="Ingresa tu nombre" id="name" name="name" required className="p-1 bg-slate-50/80 placeholder:text-gray-700" />
        <label htmlFor="mail" className="mb-2 mt-4 font-bold text-white">
          Correo Electrónico
        </label>
        <input placeholder="tucorreoelectronico@example.com" type="email" id="email" name="email" required className="p-1 bg-slate-50/80 placeholder:text-gray-700" />
        <label htmlFor="phone" className="mb-2 mt-4 font-bold text-white">
          Teléfono
        </label>
        <input placeholder="Ingresa tu número telefónico" type="number" id="phone" name="phone" required className="p-1 bg-slate-50/80 placeholder:text-gray-700" />
        <label htmlFor="message" className="mb-2 mt-4 font-bold text-white">
          Mensaje
        </label>
        <textarea placeholder="Ingresa tu mensaje" name="message" id="message" className="resize-none min-h-[200px] p-1 bg-slate-50/80 placeholder:text-gray-700" required />
        {!message ? (
          <span className="h-12 mt-2"></span>
        ) : (
          <span className="h-12 mt-2" style={message?.type == 'error' ? { color: '#f00' } : { color: '#0f0' }}>
            {message?.text}
          </span>
        )}
        <button type="submit" className="bg-slate-50 hover:bg-slate-50/80 mt-4 md:mb-0 mb-4 self-center w-32 py-2 font-semibold">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
