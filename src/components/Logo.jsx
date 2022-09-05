import Image from "next/image"

const Logo = ({image, widht, height, style}) => {
  return (
    <button className={`hover:opacity-80 ${style}`}>
      <Image src={image} width={widht} height={height} />
    </button>
  )
}

export default Logo