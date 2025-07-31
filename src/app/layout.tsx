import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoleManager - Gestion Scolaire",
  description: "Application moderne de gestion d'établissement scolaire",
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            {children}
            <Toaster />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
