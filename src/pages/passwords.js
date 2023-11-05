import { useState, useRef } from 'react';
import endPoints from '@api/index';
import {motion} from 'framer-motion';

import { getData, postData } from '@api/requests';
import useSWR from 'swr';

import { useAuth } from '@hooks/use-auth';

const Passwords = () => {
  const { data } = useSWR(endPoints.passwords.api, getData);
  data?.sort((a, b) => {
    if (a.alias > b.alias) return 1;
    if (a.alias < b.alias) return -1;
    return 0;
  });

  const {assetsData} = useAuth();

  const [fieldChanged, setFieldChanged] = useState(false);
  const [profileToChange, setProfiletoChange] = useState(null);
  const [message, setMessage] = useState(null);
  const [displayModal, setDisplayModal] = useState(false)
  const formRef = useRef(null);

  const displayAddAlias = (id) => {
    const profile = data.find((d) => d._id == id);
    setProfiletoChange({
      title: profile.type,
      alias: profile.alias,
      email: profile.platformId.email,
      id: profile._id,
    });
    setFieldChanged(true);
    setDisplayModal(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    formData.append('id', profileToChange.id);
    postData(endPoints.passwords.alias, formData)
      .then((res) => {
        setMessage(res);
        if (res.type == 'error') return;
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      })
      .catch((e) => {
        setProfiletoChange(e);
      });
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      duration: 1.1
    },
    close: {
      opacity: 0,
    }
  }

  const modalVariants = {
    open:{
      y: 0,
      duration: 2.7
    },
    close: {
      y: "-100px",
      duration: .7
    }
  }
  return (
    <div className="p-2 grid md:grid-cols-2 gap-2">
      {data?.length == 0 ? (
        <div className="flex justify-center pt-8 text-slate-700 absolute w-full">
          <p>No tienes contraseñas disponibles</p>
        </div>
      ) : (
        <>
          {data?.map((password, index) => (
            <div key={index} className="p-2 bg-[#cfcfcf] rounded-md">
              <h2 className="font-bold">
                { 
                 
                    assetsData.map(obj=>{
                    if(obj._id == password.platformId.type) return <>{obj.name}</>
                  })
                }
                .
              </h2>
              {password.alias ? (
                <div className="flex flex-wrap">
                  <div className=" flex flex-wrap gap-2">
                    <h3 className="font-semibold">Alias:</h3>
                    <p
                      className={`font font-semibold ${
                        password.platformId.type == 0
                          ? 'text-blue-700'
                          : password.platformId.type == 1
                          ? 'text-purple-700'
                          : password.platformId.type == 2
                          ? 'text-sky-600'
                          : password.platformId.type == 3
                          ? 'text-blue-500'
                          : password.platformId.type == 4
                          ? 'text-red-500'
                          : password.platformId.type == 5
                          ? 'text-green-800'
                          : 'text-red-700'
                      }`}
                    >
                      {password.alias}
                    </p>
                  </div>
                  <button className="ml-auto mr-2" onClick={() => displayAddAlias(password._id)}>
                    Cambiar
                  </button>
                </div>
              ) : (
                <div className="flex ">
                  <button className="bg-transparent text-blue-800" onClick={() => displayAddAlias(password._id)}>
                    Agregar Alias
                  </button>
                </div>
              )}
              {password?.platformId?.spotify ? <div>
                  <h4 className="font-semibold">Enlace:</h4>
                  <a className='break-all' href='password.platformId.password' target='_blank'>{password.platformId.password}</a>
                </div> : <>
                <div className="flex gap-2">
                <h4 className="font-semibold">Correo:</h4>
                <p>{password.platformId.email}</p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Contraseña:</h4>
                <p>{password.platformId.password}</p>
              </div>
                </>}
            </div>
          ))}
          {fieldChanged ? (
            <motion.div variants={overlayVariants} animate={displayModal ? "open" : "close"} initial={{opacity: 0.6}}  className="fixed left-0 top-0 z-40 flex justify-center items-center w-full min-h-screen  bg-black/30">
              <motion.form variants={modalVariants} animate={displayModal ? "open" : "close"} initial={{y: "-100px"}} className="bg-white md:w-[480px] px-5 py-2 md:py-4 md:-mt-8  flex flex-col items-start " onSubmit={handleSubmit} ref={formRef}>
                <h3 className="text-lg font-semibold">
                  {profileToChange.type == 0
                    ? 'Disney'
                    : profileToChange.type == 1
                    ? 'HBO MAX'
                    : profileToChange.type == 2
                    ? 'Prime Video'
                    : profileToChange.type == 3
                    ? 'Paramount+'
                    : profileToChange.type == 4
                    ? 'Star+'
                    : profileToChange.type == 5
                    ? 'Spotify'
                    : 'Netflix'}
                  .
                </h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  <h4 className="font-semibold">Correo:</h4>
                  <p>{profileToChange.email}</p>
                </div>
                <input
                  className="border border-black my-2 px-2  mx-auto md:max-w-[350px] md:mb-8 w-full"
                  name="alias"
                  placeholder="Asignale un alias"
                  defaultValue={profileToChange?.alias ? profileToChange?.alias : ''}
                />
                <div className="flex flex-col md:flex-row md:justify-around w-full mt-5 md:mt-0 md:px-8">
                  <button
                    className="bg-slate-300/60 hover:bg-slate-300/80 md:py-1 py-2 px-2 mt-2 w-full md:w-fit
                    "
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-slate-300/60 hover:bg-slate-300/80 md:py-1 py-2 px-2 mt-2 w-full md:w-fit
                    "
                    onClick={e =>{
                      e.preventDefault()
                      setDisplayModal(false)
                      setTimeout(()=>{
                        setFieldChanged(false)
                      },850)
                    } 
                    }
                  >
                    Cancelar
                  </button>
                </div>
                <div className="md:h-8 h-12 mb-2">{message ? <p className={`${message.type == 'success' ? 'text-green-700' : 'text-red-700'}`}>{message.text}</p> : null}</div>
              </motion.form>
            </motion.div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Passwords;
