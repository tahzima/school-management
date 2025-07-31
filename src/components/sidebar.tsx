"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Users, GraduationCap, Calendar, CreditCard, Bus, BookOpen, Building,
  UserCheck, Home, Settings, LogOut, Menu
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: Home },
    { id: "students", label: "Élèves", icon: Users },
    { id: "teachers", label: "Professeurs", icon: GraduationCap },
    { id: "courses", label: "Cours", icon: BookOpen },
    { id: "schedule", label: "Emploi du Temps", icon: Calendar },
    { id: "rooms", label: "Salles", icon: Building },
    { id: "enrollment", label: "Inscriptions", icon: UserCheck },
    { id: "payments", label: "Paiements", icon: CreditCard },
    { id: "transport", label: "Transport", icon: Bus },
  ]

  // Sidebar content à réutiliser
  const sidebarContent = (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">EcoleManager</h2>
            <p className="text-xs text-gray-500">Gestion Scolaire</p>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeModule === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start transition-all duration-200",
              activeModule === item.id ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100 text-gray-700",
            )}
            onClick={() => {
              setActiveModule(item.id)
              setOpen(false) // Ferme le menu mobile
            }}
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
      {/* User Info & Footer */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {user && (
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <Button variant="ghost" className="w-full justify-start text-gray-700">
          <Settings className="h-4 w-4 mr-3" />
          Paramètres
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Bouton menu hamburger mobile (caché si open) */}
      {!open && (
        <button
          className="fixed z-50 p-1 rounded-md shadow md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Sidebar desktop */}
      <div className="hidden md:flex">{sidebarContent}</div>

      {/* Sidebar mobile (overlay) */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative">{sidebarContent}</div>
        </div>
      )}
    </>
  )
}