import { useRef, useState } from 'react';
import { postData } from '@api/requests';
import endPoints from '@api/index';
import { motion } from 'framer-motion';

const Recoverpassword = () => {
  const formRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [animationVar, setAnimationVar] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(formRef.current);
    const data = {
      email: formdata.get('email'),
    };
    if (!/[\w\.]{3,30}\+?\w{0,10}@[\w\.\-]{3,}\.\w{2,3}/i.test(data.email)) {
      setMessage({
        text: 'Usuario de email invalido',
        type: 'error',
      });
      return;
    }
    postData(endPoints.users.recoverPassword, data)
      .then((res) => {
        setMessage({ text: 'Solicitud enviada', type: 'success' });
        setMessageModal(true);
        setAnimationVar(true);
      })
      .catch((e) => {
        setMessage({ text: 'Solicitud enviada', type: 'success' });
        setMessageModal(true);
        setAnimationVar(true);
      });
  };
  const variantsOverlay = {
    show: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 1.3,
      },
    },
    hidde: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 2,
      },
    },
  };

  const variantsModal = {
    show: {
      scale: 1,
      transition: {
        ease: 'easeInOut',
        duration: 2,
      },
    },
    hidde: {
      scale: 0,
      transition: {
        ease: 'easeOut',
        duration: 1.5,
      },
    },
  };

  return (
    <div className="flex justify-center items-start -mt-[63px] md:pt-[50px]">
      <form className="bg-black text-white px-3 md:px-4 pt-[45px] md:pt-8 py-8 w-full min-h-screen md:w-[455px] md:min-h-min gap-2 flex flex-col" ref={formRef} onSubmit={handleSubmit}>
        <h3 className="text-2xl text-yellow-400">Recuperar Contraseña.</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Ingresa tu correo electrónico:</label>
          <input className="text-black" type="email" name="email"></input>
          <div className="h-6">{message ? <p className={`${message.type == 'error' ? 'text-red-600' : 'text-green-600'}`}>{message.text}</p> : null}</div>
          <button type="submit" className="bg-blue-700 mt-2">
            Recuperar
          </button>
        </div>
      </form>
      {messageModal ? (
        <motion.div
          className="fixed top-0 right-0 min-h-screen w-full bg-black/40 flex justify-center items-center"
          initial={{ opacity: 0 }}
          variants={variantsOverlay}
          animate={animationVar ? 'show' : 'hidde'}
        >
          <motion.div className="bg-white/90 md:w-5/6 md:h-3/6 h-4/6 flex flex-col items-center py-10 px-4" initial={{ scale: 0 }} variants={variantsModal} animate={animationVar ? 'show' : 'hidde'}>
            <h3 className="font-bold text-2xl mb-2">¡Revisa tu correo!</h3>
            <p className="text-lg text-center">Se ha enviado un correo a tu dirección de correo electrónico con instrucciones para restaurar la contraseña, si es que existe en nuestro sistema.</p>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Recoverpassword;
