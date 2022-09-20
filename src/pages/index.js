import { useState } from 'react';

import { useAuth } from '@hooks/use-auth';

import disneyLogo from '@images/disney-logo.png';
import hboLogo from '@images/hbo-max-logo.svg';
import primeLogo from '@images/prime-video-logo.svg';
import paramountLogo from '@images/Paramount-logo.png';
import starLogo from '@images/star+plus-logo.svg';

import Logo from '@components/Logo';
import ModuleBuy from '@components/Module-Buy';

export default function Home() {
  const [selected, setSelected] = useState(null);

  const { streamDisney, streamHBO, streamPrime, streamParamount, streamStar } = useAuth();

  return (
    <div className="w-full md:pb-20 min-h-screen -mt-[63px] pt-[63px] bg-[#050714] h-full">
      <div className="flex flex-wrap gap-5 py-6 w-full justify-center px-2">
        <ModuleBuy platformName='Disney+' image={disneyLogo} price={25} bgColor={'#fff'} color="#000" width="360px" height="200px" code={0} quantity={streamDisney.length} />
        <ModuleBuy platformName='HBO MAX' image={hboLogo} price={25} bgColor={'#fff'} color="#000" width="360px" height="200px" code={1} quantity={streamHBO.length} />
        <ModuleBuy platformName='Prime Video' image={primeLogo} price={25} bgColor={'#fff'} color="#000" width="210px" height="200px" code={2} quantity={streamPrime.length} />
        <ModuleBuy platformName='Paramount+' image={paramountLogo} price={25} bgColor={'#fff'} color="#000" width="360px" height="200px" code={3} quantity={streamParamount.length} />
        <ModuleBuy platformName='Star+' image={starLogo} price={25} bgColor={'#fff'} color="#000" width="220px" height="200px" code={4} quantity={streamStar.length} />
      </div>
    </div>
  );
}
