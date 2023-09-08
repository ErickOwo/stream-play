import React from 'react'
import { useRouter } from 'next/router';


const UpdatePay = () => {
  const router = useRouter();

  console.log(router.query.id)
  return (
    <div>Updatepay</div>
  )
}

export default UpdatePay