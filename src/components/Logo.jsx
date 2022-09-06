import Image from "next/image"

const Logo = ({image, widht, height, style, changeSelected, num}) => {
  return (
    <button className={`hover:opacity-80 ${style} md:w-[160px] w-[100px]`} onClick={()=> changeSelected(num)}>
      <Image src={image} width={widht} height={height} />
    </button>
  )
}

export default Logo