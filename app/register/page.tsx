import React from 'react'
import RegisterForm from '@/components/RegisterForm'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const Register = async () => {

  const session = await getServerSession(authOptions)

  if(session) redirect("/dashboard")


  return (
    <div>
        <RegisterForm/>
    </div>
  )
}

export default Register