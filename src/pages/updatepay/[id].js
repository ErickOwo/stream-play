import  {useState, useRef} from 'react'
import { useRouter } from 'next/router';
import {motion} from 'framer-motion'
import Order from '@components/Order';
import cookie from 'js-cookie';

import { useAuth } from '@hooks/use-auth';

import { getData, postMultimedia } from '@api/requests';
import useSWR from 'swr';
import endPoints from '@api/index';


const UpdatePay = () => {
  const router = useRouter();
  const {id} = router.query;
  const { data, error } = useSWR(id ? endPoints.updatePay.getData + `/${id}` : null, getData);

  const formRef = useRef();
  const [message, setMessage] = useState(null);
  const [imgAdded, setImageAdded] = useState(false);

  const { assetsData } = useAuth();

  const returnDate = (date) => {
    const dateObject = new Date(date);

    const valueDay = (d) => {
      if (d == 0) return 'Domingo';
      if (d == 1) return 'Lunes';
      if (d == 2) return 'Martes';
      if (d == 3) return 'Miercoles';
      if (d == 4) return 'Jueves';
      if (d == 5) return 'Viernes';
      if (d == 6) return 'Sábado';
    };

    const valueMonth = (m) => {
      if (m == 0) return 'Enero';
      if (m == 1) return 'Febrero';
      if (m == 2) return 'Marzo';
      if (m == 3) return 'Abril';
      if (m == 4) return 'Mayo';
      if (m == 5) return 'Junio';
      if (m == 6) return 'Julio';
      if (m == 7) return 'Agosto';
      if (m == 8) return 'Septiembre';
      if (m == 9) return 'Octubre';
      if (m == 10) return 'Noviembre';
      if (m == 11) return 'Diciembre';
    };

    const dayDate = dateObject.getDate();
    const day = valueDay(dateObject.getDay());
    const month = valueMonth(dateObject.getMonth());
    const year = dateObject.getFullYear();
    return `${day}, ${dayDate} de ${month} del ${year}`;
  };

  const handleImg = (e) => {
    if (e.target.value == '') setImageAdded(false);
    else setImageAdded(true);
  };

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    postMultimedia(endPoints.updatePay.updateData +`/${data._id}`, formData)
      .then((res) => {
        setMessage({ text: 'Datos enviados correctamente', type: 'success' });

        setTimeout(() => {
          if(cookie.get('token-public-stream')) router.push('/orders');
          else router.push('/');
          setMessage(null);
        }, 1300);
      })
      .catch((e) => {
        if (e?.response?.data?.message) {
          setMessage({ text: e?.response?.data?.message, type: 'error' });
        } else setMessage({ text: 'Fallo en la API', type: 'error' });
      });
  }
  return (
    <div className='flex justify-center pt-2'>
      {
        data ? <motion.form className='bg-gray-500/20 rounded-md p-2 mx-2 flex flex-col max-w-[600px]' ref={formRef} onSubmit={handleSubmit}>
          <h3 className='font-semibold text-4xl mb-2 tex'>Actualizar Pago.</h3>
          <div className='flex flex-wrap gap-x-2 justify-between'>
            <div className='font-semibold'>No. de orden</div>
            <div>{data.orderNumber}</div>
          </div>
          <div className='grid gap-2 grid-cols-4 md:grid-cols-7 items-end'>
            <h3 className="font-semibold">Cuentas</h3>  
            <h4 className="font-semibold">Cantidad</h4>
            <h4 className="font-semibold hidden md:flex">Precio</h4>
            <h4 className="font-semibold">Meses</h4>
            <h4 className="font-semibold hidden md:flex">SubTotal</h4>
            <h4 className="font-semibold hidden md:flex">Descuento</h4>
            <h4 className="font-semibold">Total</h4>
            {
              assetsData?.map((account, index)=>{
                {
                  return <Order title={account.name} quantity={
                    index == 0 ? data.disneyProfiles :
                    index == 1 ? data.hboProfiles : 
                    index == 2 ? data.primeProfiles :
                    index == 3 ? data.paramountProfiles :
                    index == 4 ? data.vixProfiles :
                    index == 6 ? data.spotifyProfiles :
                    index == 7 ? data.crunchyrollProfiles :
                    data.netflixProfiles
                  } months={data.months} price={account.price} />
                }
              })
            }
            
          </div>
          <div className="flex mt-6 justify-between md:text-3xl text-xl mb-2">
            <h4 className="font-semibold">Total a pagar</h4>
            <p className="text-stone-800 font-bold">{`Q. ${data.total}.00`}</p>
          </div>
          <div className='flex gap-2'>
            <h4 className="font-bold">A nombre de:</h4> 
            <p className='font-Arvo '>{data.userCustomer.name}</p>
          </div>
          <div className="flex gap-2">
            <h4 className="font-bold">Banco:</h4>
            <p className={`font-Arvo ${data?.bank == 'Banrural' ? 'text-green-700' : data?.bank == 'Bantrab' ? 'text-pink-700' : data?.bank == 'BAC' ? 'text-red-700' : 'text-blue-700'}`}>
              {data?.bank}
            </p>
          </div>
          <>
            {/* banks */}
            {
              data.bank == 'Bantrab'|| data.bank == 0 ? (
              <div>
                <h3 className="text-pink-700 text-xl font-bold">Cuenta Monetaria Bantrab</h3>
                <p className="text-lg">No. 2860216878</p>
                <p className="flex flex-wrap md:gap-2">
                  A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                </p>
              </div>
            ) : data.bank == 'BI' || data.bank == 1 ? (
              <div>
                <h3 className="text-blue-700 text-xl font-bold">Cuenta de Ahorro BI</h3>
                <p className="text-lg">No. 0770692</p>
                <p className="flex flex-wrap md:gap-2">
                  A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                </p>
              </div>
            ) : data.bank == 'BAC' || data.bank == 2 ? (
              <div>
                <h3 className="text-red-800 text-xl font-bold">Cuenta de Ahorro BAC</h3>
                <p className="text-lg">No. 969894401</p>
                <p className="flex flex-wrap md:gap-2">
                  A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                </p>
              </div>
            ) : data.bank == 4 ? (
            <div>
              <h3 className="text-blue-800 text-xl font-bold">Cuenta de Ahorro G&T Continental</h3>
              <p className="text-lg">No. 04960339927</p>
              <p className="flex flex-wrap md:gap-2">
                A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
              </p>
            </div>
          ) : data.bank == 5 ? (
            <div>
              <h3 className="text-green-900 text-xl font-bold">Cuenta de Ahorro Promerica</h3>
              <p className="text-lg">No. 33362081739801</p>
              <p className="flex flex-wrap md:gap-2">
                A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
              </p>
            </div>
          ) : data.bank == 6 ? (
            <div>
              <h3 className="text-white text-xl font-bold">Cuenta de Ahorro BAM</h3>
              <p className="text-lg">No. 4016465952</p>
              <p className="flex flex-wrap md:gap-2">
                A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
              </p>
            </div>
          ) : data.bank == 7 ? (
            <div>
              <h3 className="text-sky-800 text-xl font-bold">Cuenta de Ahorro corriente MICOOPE</h3>
              <p className="text-lg">No. 1172101057095</p>
              <p className="flex flex-wrap md:gap-2">
                A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
              </p>
            </div>
          ) : (
              <div>
                <h3 className="text-green-800 text-xl font-bold">Cuenta de Ahorro Banrural</h3>
                <p className="text-lg">No. 4314151198</p>
                <p className="flex flex-wrap md:gap-2">
                  A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                </p>
              </div>
            )
          }
          </>
          <div className="flex gap-2">
            <h4 className="font-bold">Estado:</h4>
            <p className={`font-Arvo font-semibold tracking-wider ${data?.pending ? 'text-yellow-600' : data?.active ? 'text-green-600' : 'text-orange-600'}`}>
              {data?.pending ? 'Pendiente' : data?.active ? 'Pagado' : 'Actualizar pago'}
            </p>
          </div>
          {data.startDate ? (
            <div className="flex flex-wrap gap-2">
              <h4 className="font-bold">Pago realizado el:</h4>
              <p className={`font-Arvo`}>{returnDate(data.startDate)}</p>
            </div>
          ) : null}
          {data.endDate ? (
            <div className="flex flex-wrap gap-2">
              <h4 className="font-bold">Fecha para renovar el pago:</h4>
              <p className={`font-Arvo`}>{returnDate(data.endDate)}</p>
            </div>
          ) : null}
          <p className="font-semibold mt-2">
                Al realizar el <b className="font-bold">Deposito</b> tomale fóto a tu boleta de pago. Si ha sido <b className="font-bold">Transferencia Bancaria</b> manda una captura de pantalla de la
                transferencia bancaria y agregala:
              </p>
              <label
                className={`my-2 w-full h-[80px] ${
                  imgAdded ? 'bg-pink-800 hover:bg-pink-700' : 'bg-slate-800 hover:bg-slate-700'
                } rounded-lg flex justify-center items-center text-lg text-white cursor-pointer`}
                htmlFor="media"
              >
                {imgAdded ? 'Imagen Añadida' : 'Añadir Imagen'}
              </label>
              <input accept="image/*" type="file" id="media" className="hidden" name="media" onChange={handleImg} />
              {message ? (
                <div className={`md:h-6 h-10 ${message.type == 'error' ? 'text-red-600' : message.type == 'info' ? 'text-blue-600' : 'text-green-600'}`}>{message.text}</div>
              ) : (
                <div className="md:h-6 h-10"></div>
              )}
              <input
                onClick={() => setMessage({ text: 'Enviando información...', type: 'info' })}
                type="submit"
                value="Actualizar Pago"
                className="bg-blue-700 hover:bg-blue-600 p-2 text-white font-semibold tracking-wider my-3 cursor-pointer"
              />
        </motion.form> : null
      }
    </div>
  )
}

export default UpdatePay