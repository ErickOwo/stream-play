import { useAuth } from '@hooks/use-auth';

import ModuleBuy from '@components/Module-Buy';

export default function Home() {

  const { quantityStreaming,assetsData } = useAuth();

  return (
    <div className="w-full md:pb-20 min-h-screen -mt-[63px] pt-[63px] bg-[#050714] h-full">
      <div className="flex flex-wrap gap-5 py-6 w-full justify-center px-2">
            {
              assetsData?.map((account, index)=>{
                {
                  
                  return <ModuleBuy platformName={account.name} image={account.image} price={account.price} bgColor={'#fff'} color="#000" width={account.sizeX} height={account.sizeY} code={account.typeCode} quantity={quantityStreaming[index]?.length} index={index} />
                }
              })
            }
      </div>
    </div>
  );
}
