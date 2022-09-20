import endPoints from '@api/index';
import { getData } from '@api/requests';
import useSWR from 'swr';

const Orders = () => {
  const { data } = useSWR(endPoints.orders.api, getData);

  return (
    <div className="w-full min-h-screen py-3 px-2">
      <div className="w-full max-w-[600px] m-auto flex flex-col gap-4">
        {data?.map((info, index) => {
          return (
            <div key={index} className="bg-[#F1F1F1] p-2">
              <h3 className="flex flex-wrap md:gap-2 text-lg font-semibold">
                Pedido No. <span>{info?.orderNumber}</span>
              </h3>
              <div className="flex flex-wrap md:gap-2 gap-[1px]">
                <h4 className="font-semibold">Perfiles:</h4>
                <p className="font-Arvo">{info?.disneyProfiles > 0 ? `Disney+ ${info?.disneyProfiles},` : null}</p>
                <p className="font-Arvo">{info?.hboProfiles > 0 ? `HBO MAX ${info?.hboProfiles},` : null}</p>
                <p className="font-Arvo">{info?.primeProfiles > 0 ? `Prime Video ${info?.primeProfiles},` : null}</p>
                <p className="font-Arvo">{info?.paramountProfiles > 0 ? `Paramount+ ${info?.paramountProfiles},` : null}</p>
                <p className="font-Arvo">{info?.starProfiles > 0 ? `Star+ ${info?.starProfiles}` : null}</p>
                <p className="font-Arvo">{info?.netflixProfiles > 0 ? `Netflix ${info?.netflixProfiles}` : null}</p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Meses:</h4>
                <p className="font-Arvo">{info?.months}</p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Pago:</h4>
                <p className="font-Arvo">Q. {info?.total}.00</p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Banco:</h4>
                <p className={`font-Arvo ${info?.bank == 'Banrural' ? 'text-green-700' : info?.bank == 'Bantrab' ? 'text-pink-700' : 'text-blue-700'}`}>{info?.bank}</p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Estado:</h4>
                <p className={`font-Arvo font-semibold tracking-wider ${info?.pending ? 'text-yellow-600' : info?.accepted ? 'text-green-600' : 'text-red-600'}`}>
                  {info?.pending ? 'Pendiente' : info?.accepted ? 'Aceptado' : 'Rechazado'}
                </p>
              </div>
              <div className="flex gap-2">
                <h4 className="font-semibold">Imagen de pago:</h4>
                <a className={`font-Arvo text-gray-900 underline`} target="_blank" href={info?.imgURL} rel="noreferrer">
                  enlace/
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
