"use client"

import React from "react"

import { motion } from "framer-motion"
import { Heart, Music, ArrowLeft, Play, Pause } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

const songInfo = {
  title: "Just the Way You Are",
  artist: "Bruno Mars",
  album: "Doo-Wops & Hooligans",
  year: "2010",
}

const meaningLines = [
  { line: "Tentang Lagu Ini", type: "label" },
  { line: "Lagu ini bercerita tentang mencintai seseorang apa adanya", type: "verse" },
  { line: "Tanpa perlu berubah, karena dia sudah sempurna", type: "verse" },
  { line: "Setiap detail dari dirinya adalah keajaiban", type: "verse" },
  { line: "", type: "space" },
  { line: "Kenapa Lagu Ini Spesial", type: "label" },
  { line: "Saat lagu ini diputar, aku selalu teringat aisya", type: "verse" },
  { line: "Karena aisya memang sempurna apa adanya", type: "verse" },
  { line: "Tidak perlu mengubah apapun dari aisya", type: "verse" },
  { line: "Aisya amazing, just the way you are", type: "verse" },
]

const lyrics = [
  { line: "Tentang Lagu Ini", type: "label" },
  { line: "Lagu ini bercerita tentang mencintai seseorang apa adanya", type: "verse" },
  { line: "Tanpa perlu berubah, karena dia sudah sempurna", type: "verse" },
  { line: "Setiap detail dari dirinya adalah keajaiban", type: "verse" },
  { line: "", type: "space" },
  { line: "Kenapa Lagu Ini Spesial", type: "label" },
  { line: "Saat lagu ini diputar, abang selalu teringat aisya", type: "verse" },
  { line: "Karena aisya memang sempurna apa adanya", type: "verse" },
  { line: "Tidak perlu mengubah apapun dari aisya", type: "verse" },
  { line: "Aisya amazing, just the way you are", type: "verse" },
]

export default function OurSongPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Path ke file MP3 - taruh file di /public/music/song.mp3
  const audioSrc = "/music/just-the-way-you-are.mp3"

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      {/* Floating music notes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${10 + i * 12}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Music className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <motion.button
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          </Link>
          <div>
            <h1 className="font-semibold text-foreground">Lagu untuk Aisya</h1>
            <p className="text-sm text-muted-foreground">Yang membuat abang selalu ingat aisyaa cintaku </p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Album Art */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-square rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Album Cover Image - ganti path sesuai file kamu */}
            <img 
              src="/images/album-cover.jpeg" 
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            {/* Animated rings saat playing */}
            {isPlaying && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-3xl border-4 border-primary/30"
                  animate={{ scale: [1, 1.05], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </>
            )}
            
            {/* Vinyl disc di tengah */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-black/80 shadow-lg flex items-center justify-center"
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Music className="w-4 h-4 text-primary-foreground" />
              </div>
            </motion.div>
          </div>

          {/* Play Button */}
          <motion.button
            className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </motion.button>
        </motion.div>

        {/* Audio Progress Bar */}
        <motion.div
          className="mb-6 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </motion.div>

        {/* Song Info */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">{songInfo.title}</h2>
          <p className="text-muted-foreground">{songInfo.artist}</p>
          <p className="text-sm text-muted-foreground/70 mt-1">{songInfo.album} ({songInfo.year})</p>
        </motion.div>

        {/* Lyrics Card */}
        <motion.div
          className="bg-card rounded-3xl shadow-xl border border-border/50 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Music className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Makna Lagu Ini</h3>
          </div>

          <div className="space-y-3">
            {meaningLines.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                {item.type === "label" ? (
                  <p className="text-sm font-semibold text-primary mt-4 first:mt-0">
                    {item.line}
                  </p>
                ) : item.type === "space" ? (
                  <div className="h-2" />
                ) : (
                  <p className="text-card-foreground leading-relaxed pl-4 border-l-2 border-border">
                    {item.line}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Spotify/YouTube Link hint */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Dengarkan lagu lengkapnya di Spotify atau YouTube
            </p>
          </div>
        </motion.div>

        {/* Message Card */}
        <motion.div
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <h3 className="font-semibold text-foreground">Pesan Spesial</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-balance">
            &ldquo;When I see your face, there&apos;s not a thing that I would change, cause you&apos;re amazing, just the way you are.&rdquo;
          </p>
          <p className="text-muted-foreground leading-relaxed text-balance mt-3">
            Aisya engga perlu berubah untuk siapapun. Aisya udah sempurna dengan semua kekurangan dan kelebihan Aisya sayangg. 
            Selamat ulang tahun cintakuu maniskuuu, semoga di usia yang baru ini Aisya makin mencintai diri Aisya sendiri!
          </p>
        </motion.div>

        {/* Footer Hearts */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            >
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
