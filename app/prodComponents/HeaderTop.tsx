
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
            <div className='flex gap-4'>
                    <select 
                    className='text-gray-500 text-[12px] w-[70px] border-gray-200'
                    style={{borderRadius:"5px"}}
                    name='currency'
                    id='currency'
                    >
                        <option value="USD $">USD $</option>
                        <option value="EUR $">EUR </option>
                        <option value="INR $">INR</option>
                    </select>

                    <select 
                    className='text-gray-500 text-[12px] w-[80px]'
                    style={{borderRadius:"5px"}}
                    name='language'
                    id='language'
                    >
                        <option value="English">English</option>
                        <option value="French">French</option>
                    </select>
                </div>
            <div className='flex gap-10'>
                <Link href='/home'>
                <li>Home</li>
                </Link>
                <Link href='/cart'>
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