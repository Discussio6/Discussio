import React from 'react'
import Image from 'next/image'

function Logo() {
  return (
    <Image src="/images/logo.png" alt="logo" width={220} height={40} />
  )
}

export default Logo