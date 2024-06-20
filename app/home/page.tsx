"use client"
import React from 'react'
import Hero from '../prodComponents/Hero'
import Testimonial from '../prodComponents/Testimonial'
import ProductsPage from '../product-details/page'

const page = () => {

  return (
    <div>
      <Hero />
      <ProductsPage />
      <Testimonial />
    </div>
  )
}

export default page