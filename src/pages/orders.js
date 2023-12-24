import endPoints from '@api/index';
import { getData } from '@api/requests';
import Link from 'next/link';
import useSWR from 'swr';

const Orders = () => {
  const { data } = useSWR(endPoints.orders.api, getData);

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

  return (
    <div className="w-full min-h-screen py-3 px-2">
      <div className="w-full max-w-[600px] m-auto flex flex-col gap-4">
        {data?.length == 0 ? (
          <div className="flex justify-center pt-8 text-slate-700">
            <p>No has realizado ningún pedido</p>
          </div>
        ) : (
          <>
            {data?.map((info, index) => {
              return (
                <div key={index} className="bg-[#F1F1F1] p-2">
                  <h3 className="flex flex-wrap md:gap-2 text-lg font-bold">
                    Pedido No. <span className="font-normal">{info?.orderNumber}</span>
                  </h3>
                  <div className="flex flex-wrap md:gap-2 gap-1">
                    <h4 className="font-bold">Perfiles:</h4>
                    <p className="font-Arvo">{info?.disneyProfiles > 0 ? `Disney+ ${info?.disneyProfiles}, ` : null}</p>
                    <p className="font-Arvo">{info?.hboProfiles > 0 ? `HBO MAX ${info?.hboProfiles}, ` : null}</p>
                    <p className="font-Arvo">{info?.primeProfiles > 0 ? `Prime Video ${info?.primeProfiles}, ` : null}</p>
                    <p className="font-Arvo">{info?.paramountProfiles > 0 ? `Paramount+ ${info?.paramountProfiles}, ` : null}</p>
                    <p className="font-Arvo">{info?.starProfiles > 0 ? `Star+ ${info?.starProfiles},` : null}</p>
                    <p className="font-Arvo">{info?.netflixProfiles > 0 ? `Netflix ${info?.netflixProfiles}, ` : null}</p>
                    <p className="font-Arvo">{info?.spotifyProfiles > 0 ? `Spotify ${info?.spotifyProfiles}` : null}</p>
                    <p className="font-Arvo">{info?.crunchyrollProfiles > 0 ? `Crunchyroll ${info?.crunchyrollProfiles}` : null}</p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="font-bold">Meses:</h4>
                    <p className="font-Arvo">{info?.months}</p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="font-bold">Pago:</h4>
                    <p className="font-Arvo">Q. {info?.total}.00</p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="font-bold">Banco:</h4>
                    <p className={`font-Arvo ${info?.bank == 'Banrural' ? 'text-green-700' : info?.bank == 'Bantrab' ? 'text-pink-700' : info?.bank == 'BAC' ? 'text-red-700' : 'text-blue-700'}`}>
                      {info?.bank}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="font-bold">Estado:</h4>
                    <p className={`font-Arvo font-semibold tracking-wider ${info?.pending ? 'text-yellow-600' : info?.accepted ? 'text-green-600' : 'text-red-600'}`}>
                      {info?.pending ? 'Pendiente' : info?.accepted ? 'Aceptado' : 'Rechazado'}
                    </p>
                  </div>
                  {info.startDate ? (
                    <div className="flex flex-wrap gap-2">
                      <h4 className="font-bold">Pago realizado el:</h4>
                      <p className={`font-Arvo`}>{returnDate(info.startDate)}</p>
                    </div>
                  ) : null}
                  {info.endDate ? (
                    <div className="flex flex-wrap gap-2">
                      <h4 className="font-bold">Fecha para renovar el pago:</h4>
                      <p className={`font-Arvo`}>{returnDate(info.endDate)}</p>
                    </div>
                  ) : null}
                  <div className="flex gap-2">
                    <h4 className="font-bold">Imagen de pago:</h4>
                    <a className={`font-Arvo text-gray-900 underline`} target="_blank" href={info?.imgRequest ? info?.imgRequest :info?.imgURL} rel="noreferrer">
                      enlace/
                    </a>
                  </div>
                  <Link href={`/updatepay/${info.orderNumber}`}>
                    <button
                    className="bg-blue-600 text-white py-1 px-2 my-2  rounded-lg"
                    >
                      Actualizar Pago
                    </button>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
