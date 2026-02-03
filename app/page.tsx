"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { MainContent } from "@/components/main-content"
import { motion, AnimatePresence } from "framer-motion"

export default function BirthdayPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen onSuccess={() => setIsAuthenticated(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
