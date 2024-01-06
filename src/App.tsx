import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import Alert from './components/Alert'
import Hero from './components/Hero'
import LyricsCard from './components/LyricsCard'
import Navbar from './components/Navbar'
import SkeletonLoader from './components/SkeletonLoader'

import { FaFacebook, FaGithub, FaYoutube, FaInstagram, FaTwitter, FaSearch } from 'react-icons/fa'
import Lottie from 'lottie-react'

import landingAnimationData from './assets/lottie/landing-page-animation.json'
import songNotFoundAnimationData from './assets/lottie/song-not-found-animation.json'
import profileUrl from './assets/profile.jpg'
import './App.css'

const schema = zod.object({
  song: zod.string()
}).required()

type LyricsResult = {
  title: string;
  artist: string;
  lyrics: string;
  albumArt: string;
}

function App() {
  const { register, handleSubmit, formState: { isLoading, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  })
  const [ result, setResult ] = useState<LyricsResult | undefined>(undefined)
  const [ song, setSong ] = useState<string | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = async (data: { song?: string }) => {
    setSong(data.song)

    if(data.song) 
      setResult(await (await fetch(`https://lyrics-finder-api.vercel.app/lyrics?song==${encodeURIComponent(data.song)}`)).json())
    else
      alert('Song title is required.')
  }

  return (
   <div className='min-w-[320px]' data-theme="coffee">
      <Navbar>
        <Navbar.Brand brand='Lyrics Finder' />
        <Navbar.Actions>
          <Navbar.AvatarWithDropdown src={ profileUrl }>
            <Navbar.DropdownItem>
              <a href='https://facebook.com/johnroycalimlim' target='_blank'><FaFacebook /> Facebook</a>
            </Navbar.DropdownItem>
            <Navbar.DropdownItem>
              <a href='https://github.com/SnoopyCodeX' target='_blank'><FaGithub /> Github</a>
            </Navbar.DropdownItem>
            <Navbar.DropdownItem>
              <a href='https://youtube.com/@SnoopyCodeX' target='_blank'><FaYoutube /> Youtube</a>
            </Navbar.DropdownItem>
            <Navbar.DropdownItem>
              <a href='https://instagram.com/johnroylapida' target='_blank'><FaInstagram /> Instagram</a>
            </Navbar.DropdownItem>
            <Navbar.DropdownItem>
              <a href='https://x.com/johnroylapida' target='_blank'><FaTwitter /> Twitter</a>
            </Navbar.DropdownItem>
          </Navbar.AvatarWithDropdown> 
        </Navbar.Actions>
      </Navbar>
      <Hero>
        <Hero.Content>
          <Hero.Title title='Lyrics Finder' />

          <p className='mt-2 mb-5'>
            A simple song lyrics finder app built with Typescript, Fetch API, Express, React+Vite, Tailwind CSS, React-Hook-Forms, Zod, and DaisyUI.
          </p>

          <form ref={ formRef } onSubmit={ handleSubmit(onSubmit) } className="flex-column md:flex gap-2 w-full justify-items-center items-center">
            <input type="text" {...register('song')} disabled={ isLoading || isSubmitting } className="w-full max-w-md input input-bordered rounded-md mb-2 md:mb-0 p-2 mr-0 hover:outNavbar.DropdownItemne focus:ring focus:outNavbar.DropdownItemne-none focus:ring-primary" placeholder="Search a song..." />
            <button type='submit' className="btn md:btn-md btn-primary" disabled={ isLoading || isSubmitting }>
              { isLoading || isSubmitting ? <span className='loading loading-ring text-primary'></span> : <FaSearch /> }
              Search
            </button>
          </form>

          <div className="container mx-auto mt-2">
            {
              isLoading || isSubmitting ?
                <SkeletonLoader /> :
                (
                  result ?
                  (
                    result.title === undefined ?
                    (
                      <>
                        <Alert type='error'>
                          <span>Error! The lyrics of <strong>{ song }</strong> was not found.</span>
                        </Alert>
                        <Lottie animationData={ songNotFoundAnimationData } loop={true} width={120} height={120} />
                      </>
                    ) :
                    <LyricsCard>
                      <LyricsCard.Body>
                        <div className="flex gap-4 items-start">
                          <LyricsCard.Photo src={ result.albumArt } />

                          <div className="flex-col gap-4 justify-items-center">
                            <h4 className="card-title text-base-content">{ result.title }</h4>
                            <p className="card-subtitle text-primary text-start text-sm">{ result.artist }</p>
                          </div>
                        </div>

                        <p className="text-primary text-start mt-4" style={{ whiteSpace: "pre-line" }}>
                          { result.lyrics }
                        </p>
                      </LyricsCard.Body>
                    </LyricsCard>
                  )
                  :
                  <Lottie animationData={ landingAnimationData } loop={true} width={120} height={120} />
                )
            }
          </div>
        </Hero.Content>
      </Hero>
   </div>
  )
}

export default App
