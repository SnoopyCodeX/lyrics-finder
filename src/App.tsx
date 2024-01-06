import { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import * as zod from 'zod'

import Alert from './components/Alert'
import Form from './components/Form'
import Hero from './components/Hero'
import LyricsCard from './components/LyricsCard'
import Navbar from './components/Navbar'
import SkeletonLoader from './components/SkeletonLoader'

import { FaFacebook, FaGithub, FaYoutube, FaInstagram, FaTwitter, FaSearch } from 'react-icons/fa'
import Lottie from 'lottie-react'

import landingAnimationData from './assets/lottie/landing-page-animation.json'
import songNotFoundAnimationData from './assets/lottie/song-not-found-animation.json'
import profileUrl from './assets/profile.jpg'
import { findLyrics } from './api/lyrics.api'
import './App.css'

type SongInput = {
  song: string;
}

const schema = zod.object({
  song: zod.string()
}).required()

function App() {
  const methods =  useForm<SongInput>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit, formState: { errors } } = methods
  
  const [ song, setSong ] = useState<string>("")

  const mutation = useMutation({
    mutationFn: (song: string) => findLyrics(song),
    retry: false
  })

  const onSubmit: SubmitHandler<SongInput> = async (data) => {
    setSong(data.song)
    mutation.mutate(song)
  }

  return (
   <div className='min-w-[320px] bg-primary'>
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

          <p className='mt-2 mb-5 text-secondary'>
            A simple song lyrics finder app built with Typescript, Fetch API, Express, React+Vite, Tailwind CSS, React Query, React-Hook-Forms, Zod, and DaisyUI.
          </p>

          <FormProvider {...methods}>
            <Form onSubmit={ handleSubmit(onSubmit) }>
              <Form.TextInput 
                name='song'
                validator={{ required: true }}
                disabled={ mutation.isPending } 
                className="w-full max-w-md input input-bordered border-secondary rounded-md mb-2 md:mb-0 p-2 mr-0 hover:outline-secondary focus:ring focus:outline-none focus:ring-secondary" 
                placeholder="Search a song..." />

              <Form.Action disabled={ mutation.isPending }>
                 { mutation.isPending ? <span className='loading loading-ring text-secondary outline-none hover:outline focus:outline'></span> : <FaSearch /> }
                Search
              </Form.Action>
            </Form>
          </FormProvider>

          <div>
            {
              errors.song && (<Alert type='error'>This field is required!</Alert>)
            }
          </div>

          <div className="container mx-auto mt-2">
            {
              mutation.isError && (
                <>
                  <Alert type='error'>
                    <span>Error! The lyrics of <strong>{ song }</strong> was not found.</span>
                  </Alert>
                  <Lottie animationData={ songNotFoundAnimationData } loop={true} width={120} height={120} />
                </>
              )
            }

            {
              mutation.isPending && (
                <SkeletonLoader />
              )
            }

            {
              mutation.isSuccess && mutation.data && (
                mutation.data.title === undefined ?
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
                      <LyricsCard.Photo src={ mutation.data.albumArt } />

                      <div className="flex-col gap-4 justify-items-center">
                        <h4 className="card-title text-secondary">{ mutation.data.title }</h4>
                        <p className="card-subtitle text-secondary text-start text-sm">{ mutation.data.artist }</p>
                      </div>
                    </div>

                    <p className="text-secondary text-start mt-4" style={{ whiteSpace: "pre-line" }}>
                      { mutation.data.lyrics }
                    </p>
                  </LyricsCard.Body>
                </LyricsCard>
              )
            }
            
            {
              mutation.isIdle && (
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
