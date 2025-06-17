'use client'
import { useEffect, useState } from "react"
import { Header } from "./header";

const images = [
  '/images.jpg',
]

export function BackgroundCarrosel() {
  const [current, setCurrent] = useState(0);

  useEffect(()=> {
    const interval = setInterval(()=>{
      setCurrent((prev)=> (prev + 1) % images.length);
    },5000);
    return () => clearInterval(interval);
  },[]);

  return(
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${images[current]})`,
      }} 
    >
      <div className="absolute inset-0 bg-black/40 z-10">
        <Header/>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Busque filmes do seu interesse</h1>
        </div>

      </div>
    </div>
  )
}