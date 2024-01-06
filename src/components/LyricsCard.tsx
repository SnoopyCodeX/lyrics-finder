import { ReactNode } from 'react'

const LyricsCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className='card w-full bg-base-100 shadow-xl'>
        { children }
    </div>
  )
}

LyricsCard.Body = ({ children }: { children: ReactNode }) => (
  <div className='card-body'>
    { children }
  </div>
)

LyricsCard.Actions = ({ position, children }: { position?: "end" | "center" | "start", children: ReactNode }) => (
  <div className={`card-actions justify-${position ?? 'end'}`}>
    { children }
  </div>
)

LyricsCard.Photo = ({ src }: { src: string }) => (
    <div className="avatar">
        <div className="w-12 h-12 rounded-full ring ring-offset-base-100 ring-primary ring-offset-2">
            <img alt="Photo" src={src} />
        </div>
    </div>
)

export default LyricsCard