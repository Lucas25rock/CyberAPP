import DiscographyGrid from "@/components/discography-grid"
import CommentsSection from "@/components/comments-section"
import {
  Music,
  Globe,
  Headphones,
  Film,
  BookOpen,
} from "lucide-react"

const albums = [
  {
    title: "Welcome To My Universe",
    year: "2020",
    coverUrl: "/placeholder.svg",
    spotifyUrl: "https://open.spotify.com/album/4L4cj8hxh7gBzfmtTeInfH",
    tracks: [
      { title: "The End Begins", duration: "1:33" },
      { title: "Here We Come", duration: "4:10" },
      { title: "Hope 0%", duration: "2:59" },
      { title: "Rise Up", duration: "3:45" },
      { title: "Fight or Flight", duration: "4:02" },
      { title: "Neon Dreams", duration: "3:30" },
      { title: "Broken Circuit", duration: "3:55" },
      { title: "System Error", duration: "2:48" },
      { title: "Los Mismos Errores", duration: "4:15" },
      { title: "Unknown Systems Error", duration: "3:22" },
      { title: "Final Stand", duration: "4:30" },
      { title: "Project R.O.M", duration: "3:11" },
    ],
  },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/cyber.kyd",
    icon: "camera",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@cyberkyd7",
    icon: "video",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/3Zx09jrSmnaJCy4E1hZWhz",
    icon: "music",
  },
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/cyberkyd",
    icon: "headphones",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/CyberKYD7",
    icon: "globe",
  },
]

const socialIcons: Record<string, React.ReactNode> = {
  camera: <Film size={16} />,
  video: <Film size={16} />,
  music: <Music size={16} />,
  headphones: <Headphones size={16} />,
  globe: <Globe size={16} />,
}

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-green-glow via-transparent to-transparent pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-cyber-white">
          Cyber<span className="text-cyber-green">KYD</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-cyber-white/60 max-w-md">
          Nu Metal &middot; Cyber Metal &middot; Productor
        </p>
      </section>

      <section className="py-24 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-cyber-green">Artista</span>
          </h2>
          <p className="text-cyber-white/60 leading-relaxed max-w-xl mx-auto">
            Hola mundo, soy CyberKYD, bienvenidos a mi resistencia. Acá
            encontrarás videojuegos, música y más. Nu Metal, Cyber Metal y
            producción propia. Nuevos proyectos en camino.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-cyber-white/60 border border-zinc-800 rounded-lg hover:border-cyber-green hover:text-cyber-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[link.icon]}
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
