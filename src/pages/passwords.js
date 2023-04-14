import { useState, useEffect } from 'react';
import endPoints from '@api/index';

import { getData } from '@api/requests';
import useSWR from 'swr';

const Passwords = () => {
  const { data } = useSWR(endPoints.passwords.api, getData);

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
                {password.type == 0 ? 'Disney' : password.type == 1 ? 'HBO MAX' : password.type == 2 ? 'Prime Video' : password.type == 3 ? 'Paramount+' : password.type == 4 ? 'Star+' : 'Netflix'}.
              </h2>
              <div className="flex gap-2">
                <h4 className="font-semibold">Correo:</h4>
                <p>{password.email}</p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Contraseña:</h4>
                <p>{password.password}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Passwords;
