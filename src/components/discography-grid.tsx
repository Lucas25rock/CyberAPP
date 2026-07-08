"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Headphones } from "lucide-react"

interface Track {
  title: string
  duration: string
}

interface Album {
  title: string
  year: string
  coverUrl: string
  spotifyUrl?: string
  soundcloudUrl?: string
  tracks: Track[]
}

interface DiscographyGridProps {
  albums: Album[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function toSpotifyEmbed(url: string): string {
  return url.replace("open.spotify.com", "open.spotify.com/embed")
}

function toSoundcloudEmbed(url: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%2339FF14&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`
}

export default function DiscographyGrid({ albums }: DiscographyGridProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggle = (i: number) =>
    setExpandedIndex(expandedIndex === i ? null : i)

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {albums.map((album, i) => (
        <motion.div
          key={`${album.title}-${album.year}`}
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
          className="group rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden transition-shadow duration-300 hover:border-cyber-green hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={album.coverUrl}
              alt={`${album.title} cover`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-bold text-cyber-green leading-tight">
              {album.title}
            </h3>
            <p className="text-sm text-cyber-white/60">
              {album.year} &middot; {album.tracks.length} tracks
            </p>

            <button
              onClick={() => toggle(i)}
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 text-sm font-medium text-cyber-black bg-cyber-green rounded-md hover:bg-cyber-green-dark transition-colors cursor-pointer"
            >
              <Headphones size={16} />
              {expandedIndex === i ? "Cerrar" : "Escuchar"}
            </button>

            {expandedIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 pt-3 overflow-hidden"
              >
                {album.spotifyUrl && (
                  <iframe
                    src={toSpotifyEmbed(album.spotifyUrl)}
                    width="100%"
                    height="80"
                    allow="encrypted-media *"
                    className="rounded-md"
                  />
                )}
                {album.soundcloudUrl && (
                  <iframe
                    src={toSoundcloudEmbed(album.soundcloudUrl)}
                    width="100%"
                    height="80"
                    allow="encrypted-media *"
                    className="rounded-md"
                  />
                )}
                {!album.spotifyUrl && !album.soundcloudUrl && (
                  <p className="text-sm text-cyber-white/40">
                    No hay enlaces disponibles
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
