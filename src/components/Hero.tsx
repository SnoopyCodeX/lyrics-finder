import { ReactNode } from 'react'

const Hero = ({ children } : { children: ReactNode }) => {
  return (
    <div className='hero min-h-screen bg-base-200'>
        { children }
    </div>
  )
}

Hero.Content = ({ children } : { children: ReactNode }) => (
  <div className="hero-content text-center">
    <div className='max-w-md'>
      { children }
    </div>  
  </div>
)

Hero.Title = ({ title } : { title: string }) => (    
  <h1 className='text-5xl font-bold'>
    { title }
  </h1>
)

export default Hero