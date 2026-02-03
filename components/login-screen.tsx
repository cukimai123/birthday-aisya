"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Lock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginScreenProps {
  onSuccess: () => void
}

const PASSWORD = "1907"

export function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)

  const handlePress = (num: string) => {
    if (pin.length >= 4) return
    const newPin = pin + num
    setPin(newPin)
    setError("")
    
    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === PASSWORD) {
          onSuccess()
        } else {
          setIsShaking(true)
          setError("PIN salah, coba lagi")
          setTimeout(() => {
            setPin("")
            setIsShaking(false)
          }, 500)
        }
      }, 200)
    }
  }

  const handleClear = () => {
    setPin("")
    setError("")
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
    setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-primary/20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Heart className="w-16 h-16" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-16 text-accent/30"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-primary/15"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          <Heart className="w-10 h-10" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-accent/25"
          animate={{ y: [0, 20, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
        >
          <Heart className="w-14 h-14" fill="currentColor" />
        </motion.div>
      </div>

      <motion.div
        className={cn(
          "bg-card rounded-3xl shadow-2xl p-8 w-full max-w-sm relative z-10",
          "border border-border/50"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, x: isShaking ? [0, -10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: isShaking ? 0.4 : 0.6 }}
      >
        {/* Profile section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-4 border-card shadow-lg">
              <Heart className="w-12 h-12 text-primary" fill="currentColor" />
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-4 h-4" />
            </motion.div>
          </motion.div>
          
          <motion.h2
            className="mt-4 text-xl font-semibold text-card-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Masukkan PIN
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Untuk membuka kejutan spesial
          </motion.p>
        </div>

        {/* PIN Display */}
        <motion.div
          className="flex justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200",
                pin.length > i
                  ? "bg-primary border-primary"
                  : "bg-muted border-border"
              )}
              animate={pin.length > i ? { scale: [1, 1.1, 1] } : {}}
            >
              {pin.length > i && (
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Error message */}
        <div className="h-6 mb-4 text-center">
          {error && (
            <motion.p
              className="text-destructive text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Keypad */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              onClick={() => handlePress(num.toString())}
              className={cn(
                "h-14 rounded-xl text-xl font-semibold transition-all",
                "bg-secondary text-secondary-foreground",
                "hover:bg-primary hover:text-primary-foreground",
                "active:scale-95"
              )}
              whileTap={{ scale: 0.9 }}
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            onClick={handleClear}
            className={cn(
              "h-14 rounded-xl text-sm font-semibold transition-all",
              "bg-muted text-muted-foreground",
              "hover:bg-destructive/10 hover:text-destructive",
              "active:scale-95"
            )}
            whileTap={{ scale: 0.9 }}
          >
            Clear
          </motion.button>
          <motion.button
            onClick={() => handlePress("0")}
            className={cn(
              "h-14 rounded-xl text-xl font-semibold transition-all",
              "bg-secondary text-secondary-foreground",
              "hover:bg-primary hover:text-primary-foreground",
              "active:scale-95"
            )}
            whileTap={{ scale: 0.9 }}
          >
            0
          </motion.button>
          <motion.button
            onClick={handleBackspace}
            className={cn(
              "h-14 rounded-xl text-sm font-semibold transition-all",
              "bg-muted text-muted-foreground",
              "hover:bg-accent hover:text-accent-foreground",
              "active:scale-95"
            )}
            whileTap={{ scale: 0.9 }}
          >
            Hapus
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
