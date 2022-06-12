import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Layout({children}) {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
        <Header/>
        <main className="flex-1"> {children} </main>
        <Footer/>
    </div>
  )
}
