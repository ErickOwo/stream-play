import disneyLogo from '@images/disney-logo.png';
import hboLogo from '@images/hbo-max-logo.svg';
import primeLogo from '@images/prime-video-logo.svg';
import paramountLogo from '@images/Paramount-logo.png';
import starLogo from '@images/star+plus-logo.svg';

import Logo from '@components/Logo';

export default function Home() {
  return (
    <div className="w-full min-h-screen pb-20 pt-[80px] bg-[#050714]">
      <div className="w-full md:h-[250px] bg-[#f3f3f3] flex gap-7 items-center overflow-hidden px-5">
        <Logo image={disneyLogo} widht="220px" height="120px" />
        <Logo image={hboLogo} widht="220px" height="120px" style="ml-8" />
        <Logo image={primeLogo} widht="270px" height="290px" />
        <Logo image={paramountLogo} widht="220px" height="130px" />
        <Logo image={starLogo} widht="320px" height="210px" />
      </div>
      <div className="mt-20 mx-auto max-w-[800px] w-full bg-white h-[500px]"></div>
    </div>
  );
}
