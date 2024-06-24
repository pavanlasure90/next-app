"use client"
import React from 'react'
import Hero from '../prodComponents/Hero'
import Testimonial from '../prodComponents/Testimonial'
import ProductsPage from '../product-details/page'
import HeaderMain from '../prodComponents/HeaderMain'
import Navbar from '../prodComponents/HeaderTop'
import Footer from '../prodComponents/Footer'

const page = () => {

  return (
    <div>
      <Navbar />
      <HeaderMain />
      <Hero />
      <ProductsPage />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default page