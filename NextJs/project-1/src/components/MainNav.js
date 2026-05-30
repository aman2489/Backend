import Link from 'next/link'
import React from 'react'

const MainNav = () => {
  return (
    <div className='flex gap-6'>
      <Link href="/mainLayout/home">Home</Link>
      <Link href="/mainLayout/about">About</Link>
      <Link href="/mainLayout/contact">Contact</Link>
      <Link href="/mainLayout/products">Products</Link>
    </div>
  )
}

export default MainNav
