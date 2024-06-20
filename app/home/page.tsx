"use client"
import React from 'react'
import NewProducts from '../prodComponents/NewProducts'
import Hero from '../prodComponents/Hero'
import Testimonial from '../prodComponents/Testimonial'

const page = () => {

  return (
    <div>
      <Hero />
      <NewProducts />
      <Testimonial />
    </div>
  )
}

export default page