import { useState, useEffect } from 'react';
import axios from 'axios';
import endPoints from '@api/index';

const Passwords = () => {
  const [passwords, setPasswords] = useState(null);

  useEffect(() => {
    getPasswords();
  }, []);

  const getPasswords = async () => {
    const passwords = await axios(endPoints.passwords.api);
    console.log(passwords);
    setPasswords(passwords.data);
  };

  return (
    <div className="p-2 grid md:grid-cols-2 gap-2">
      {passwords
        ? passwords.map((password, index) => (
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
          ))
        : null}
    </div>
  );
};

export default Passwords;
