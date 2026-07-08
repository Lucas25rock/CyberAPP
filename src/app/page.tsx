import DiscographyGrid from "@/components/discography-grid"
import CommentsSection from "@/components/comments-section"
import { Globe, Music, Headphones } from "lucide-react"

const albums = [
  {
    title: "Álbum Uno",
    year: "2025",
    coverUrl: "/placeholder.svg",
    spotifyUrl: "https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy",
    tracks: [
      { title: "Track 1", duration: "3:45" },
      { title: "Track 2", duration: "4:20" },
    ],
  },
  {
    title: "Álbum Dos",
    year: "2026",
    coverUrl: "/placeholder.svg",
    soundcloudUrl: "https://soundcloud.com/forss/flickermood",
    tracks: [
      { title: "Track 1", duration: "3:30" },
      { title: "Track 2", duration: "4:15" },
    ],
  },
]

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "SoundCloud", href: "#" },
]

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-green-glow via-transparent to-transparent pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-cyber-white">
          Cyber<span className="text-cyber-green">KYD</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-cyber-white/60 max-w-md">
          Explorá la música. Sentí el sonido.
        </p>
      </section>

      <section className="py-24 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-cyber-green">Artista</span>
          </h2>
          <p className="text-cyber-white/60 leading-relaxed max-w-xl mx-auto">
            CyberKYD es un proyecto musical que fusiona sonidos electrónicos con
            influencias del cyberpunk y el synthwave. Cada track es un viaje
            sonoro a un futuro distópico pero lleno de esperanza.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-cyber-white/60 border border-zinc-800 rounded-lg hover:border-cyber-green hover:text-cyber-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="discography" className="py-24 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-cyber-green">Discografía</span>
          </h2>
          <DiscographyGrid albums={albums} />
        </div>
      </section>

      <section id="comments" className="py-24 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-cyber-green">Comentarios</span>
          </h2>
          <CommentsSection />
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-cyber-white/30 border-t border-zinc-800">
        &copy; {new Date().getFullYear()} CyberKYD. Todos los derechos
        reservados.
      </footer>
    </>
  )
}
