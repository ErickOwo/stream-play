import { useState } from 'react';
import Image from 'next/image';

import disneyLogo from '@images/disney-logo.png';
import hboLogo from '@images/hbo-max-logo.svg';
import primeLogo from '@images/prime-video-logo.svg';
import paramountLogo from '@images/Paramount-logo.png';
import starLogo from '@images/star+plus-logo.svg';

import Logo from '@components/Logo';
import ScreenBuy from '@components/ScreenBuy';

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full md:pb-20 min-h-screen -mt-[63px] pt-[63px] bg-[#050714] h-full">
      <div className="w-full py-4 md:h-[190px] bg-[#f3f3f3]  flex flex-wrap md:flex-nowrap md:gap-7 gap-3 justify-center items-center overflow-hidden px-5">
        <Logo image={disneyLogo} widht="220px" height="120px" changeSelected={setSelected} num={0} />
        <Logo image={hboLogo} widht="220px" height="120px" changeSelected={setSelected} num={1} />
        <Logo image={primeLogo} widht="270px" height="290px" changeSelected={setSelected} num={2} />
        <Logo image={paramountLogo} widht="220px" height="130px" changeSelected={setSelected} num={3} />
        <Logo image={starLogo} widht="320px" height="210px" changeSelected={setSelected} num={4} />
      </div>
      {selected == 0 ? (
        <ScreenBuy image={disneyLogo} price={25} bgColor={'#454790'} color="#fff" width="360px" height="200px" code={0} />
      ) : selected == 1 ? (
        <ScreenBuy image={hboLogo} price={25} bgColor={'#E817F9'} color="#fff" width="360px" height="200px" code={1} />
      ) : selected == 2 ? (
        <ScreenBuy image={primeLogo} price={25} bgColor={'#fef9f8'} color="#000" width="210px" height="200px" code={2} />
      ) : selected == 3 ? (
        <ScreenBuy image={paramountLogo} price={25} bgColor={'#000'} color="#fff" width="360px" height="200px" code={3} />
      ) : selected == 4 ? (
        <ScreenBuy image={starLogo} price={25} bgColor={'#fff0f0'} color="#f00" width="220px" height="200px" code={4} />
      ) : (
        <div className="md:mt-20 mx-auto max-w-[560px] w-full bg-transparent lg:h-[308px] h-[300px]"></div>
      )}
    </div>
  );
}
