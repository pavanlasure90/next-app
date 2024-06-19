import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
        <ul className='flex justify-between p-5 items-center bg-slate-600 text-white ' >
            <div>
                <Link href='/'>
                <li>Thunder Shop</li>
                </Link>
            </div>
            <div className='flex gap-10'>
                <Link href='/userspage'>
                <li>Home</li>
                </Link>
                <Link href='/userspage/user-details/cart'>
                <li>Cart</li>
                </Link>
                <Link href='/'>
                <li>Logout</li>
                </Link>
            <div>
            </div>
            </div>
        </ul>
    </div>
  )
}

export default Navbar