// "use client"

// import { SessionProvider } from "next-auth/react"

// export const AuthProviders = ({ children }) => {
//     return <SessionProvider>{ children } </SessionProvider>
// }


"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};