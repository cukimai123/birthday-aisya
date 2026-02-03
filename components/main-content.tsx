"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Sparkles, User, Camera, BookOpen, Gift, Cake, PartyPopper, Star, ChevronLeft, ChevronRight, Music } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "memories", label: "Memories", icon: Camera },
  { id: "wishes", label: "Wishes", icon: BookOpen },
]

const memories = [
  { id: 1, gradient: "from-pink-300 to-rose-400", image: "/memories/memory1.jpeg" },
  { id: 2, gradient: "from-rose-300 to-pink-400", image: "/memories/memory2.jpeg" },
  { id: 3, gradient: "from-pink-400 to-rose-300", image: "/memories/memory3.jpeg" },
  { id: 4, gradient: "from-rose-400 to-pink-300", image: "/memories/memory4.jpeg" },
  { id: 5, gradient: "from-pink-300 to-rose-500", image: "/memories/memory5.jpeg" },
  { id: 6, gradient: "from-rose-300 to-pink-500", image: "/memories/memory6.jpeg" },
]

export function MainContent() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen pb-8 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-accent/20 to-background" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="mb-6"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                <Cake className="w-16 h-16 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 bg-card rounded-full p-2 shadow-lg"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PartyPopper className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-2 bg-card rounded-full p-2 shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
              Happy Birthday!
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" fill="currentColor" />
              <span className="text-2xl md:text-3xl font-semibold text-primary">19th</span>
              <Star className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
          </motion.div>

          <motion.p
            className="text-muted-foreground max-w-md text-balance leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Selamat ulang tahun ke-19 sayanggg!!! Semoga sehat selalu, lancar rezekiii, dan makin banyak momen bahagia barengg.
          </motion.p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="relative z-10 max-w-lg mx-auto px-4 -mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-4 px-2 flex items-center justify-center gap-2 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "memories" && <MemoriesSection />}
            {activeTab === "wishes" && <WishesSection />}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span className="text-sm">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ProfileSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <motion.div
        className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 border-4 border-card shadow-lg"
        whileHover={{ scale: 1.05 }}
      >
       <img src="/images/profile.jpeg" alt="Profile" className="w-full h-full object-cover" />
      </motion.div>

      <h3 className="text-xl font-semibold text-card-foreground mb-2">
        Aisya Fatma Dianty Putri
      </h3>
      
      <p className="text-muted-foreground leading-relaxed text-balance">
        Aisya orangnya  mandiri, kuat, keras kepala sedikittt, cengeng kalo soal drakor, jajanann favoritnya sempol, suka silent treatment, suka kevin lius boong, suka mandi hujan sampe sakit, dann buanyakkkk lagii masihhh......
      </p>

      <div className="mt-6 flex justify-center gap-4">
        {[Gift, Heart, Sparkles].map((Icon, i) => (
          <motion.div
            key={i}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 10 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function MemoriesSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
        Momen Berharga
      </h3>

      <div className="relative px-2">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {memories.map((memory, i) => (
              <CarouselItem key={memory.id} className="pl-2 basis-[85%]">
               <img  src={memory.image || "/placeholder.svg"} alt={`Foto ${memory.id}`} className="w-full h-full object-cover"/>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation Buttons */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 shadow-md flex items-center justify-center text-foreground hover:bg-card transition-colors z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 shadow-md flex items-center justify-center text-foreground hover:bg-card transition-colors z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {memories.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === i + 1 
                ? "bg-primary w-6" 
                : "bg-border hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-3">
        Geser untuk melihat foto kenangan
      </p>

      {/* Our Song Button */}
      <Link href="/our-song">
        <motion.button
          className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-primary to-accent rounded-xl text-primary-foreground font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Music className="w-5 h-5" />
          <span>Lagu untuk Kamu</span>
        </motion.button>
      </Link>
    </motion.div>
  )
}

function WishesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <motion.div
          className="inline-block"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-2" />
        </motion.div>
        <h3 className="text-lg font-semibold text-card-foreground">
          Pesan Untukmu
        </h3>
      </div>

      <div className="bg-secondary/50 rounded-2xl p-5 border border-border/50">
        <p className="text-card-foreground leading-relaxed text-balance">
          Semoga di usia 19 ini aisya makin banyak rezekinyaa, keterima dijurusan yang aisyaa pilihh, sehatt terusss, sayangg abangg teruss, gaa kerass kepalaa lagiii, makin rajin sholatnyaa, dan lain lain yangg gabisa abang tulis disiniii heheee..... 
          Tetap jadi versi terbaik diri aisyaa sendiri yaa sayangkuu, selalu bahagia dan sehat mbuuuquuhhh. 
        </p>
      </div>

      <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
        <p className="text-card-foreground leading-relaxed text-balance">
          Terima kacihhhh sayanggg udahh  hadir lagiii dan jadiii bagiannn darii hidup abid yang kesepian iniiiii. 
          Semoga semua mimpiii aisyaaa dan harapan aisyaaa terwujud SEMUAANYAA!!!. Selamat ulang tahunnnn MBUUUUUU!!!!!
        </p>
      </div>

      <motion.div
        className="flex justify-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            >
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
