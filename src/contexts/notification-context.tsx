"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "./auth-context"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: Date
  read: boolean
  userId: string
  actionUrl?: string
  priority: "low" | "medium" | "high"
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read" | "userId">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nouveau paiement reçu",
    message: "Paiement de 450€ reçu pour Marie Dubois",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    userId: "1",
    priority: "medium",
    actionUrl: "/payments",
  },
  {
    id: "2",
    title: "Inscription en attente",
    message: "Nouvelle demande d'inscription de Thomas Leroy",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    userId: "1",
    priority: "high",
    actionUrl: "/enrollment",
  },
  {
    id: "3",
    title: "Maintenance bus",
    message: "Le bus de la ligne Sud sera en maintenance demain",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    userId: "1",
    priority: "medium",
    actionUrl: "/transport",
  },
  {
    id: "4",
    title: "Réunion parents-professeurs",
    message: "Réunion prévue le 25 janvier à 18h00",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    userId: "2",
    priority: "low",
  },
  {
    id: "5",
    title: "Notes disponibles",
    message: "Les notes du contrôle de mathématiques sont disponibles",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: false,
    userId: "3",
    priority: "medium",
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      // Filter notifications for current user
      const userNotifications = mockNotifications.filter((n) => n.userId === user.id)
      setNotifications(userNotifications)
    } else {
      setNotifications([])
    }
  }, [user])

  // Simulate real-time notifications
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      // Randomly add new notifications (simulation)
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: "Nouvelle notification",
          message: "Ceci est une notification de test en temps réel",
          type: "info",
          timestamp: new Date(),
          read: false,
          userId: user.id,
          priority: "low",
        }

        setNotifications((prev) => [newNotification, ...prev])

        // Show toast for high priority notifications
        if (newNotification.priority === "high") {
          toast({
            title: newNotification.title,
            description: newNotification.message,
          })
        }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [user, toast])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const addNotification = (notificationData: Omit<Notification, "id" | "timestamp" | "read" | "userId">) => {
    if (!user) return

    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      userId: user.id,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for important notifications
    if (newNotification.priority === "high" || newNotification.type === "error") {
      toast({
        title: newNotification.title,
        description: newNotification.message,
        variant: newNotification.type === "error" ? "destructive" : "default",
      })
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
