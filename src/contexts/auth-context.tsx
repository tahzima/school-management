"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

export type UserRole = "admin" | "teacher" | "parent" | "student"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  permissions: string[]
  schoolId: string
  classId?: string
  studentIds?: string[] // For parents
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: RegisterData) => Promise<boolean>
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  isRole: (role: UserRole) => boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  schoolId: string
  classId?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@ecole.fr",
    name: "Administrateur Principal",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["manage_users", "manage_school", "view_all", "manage_payments", "manage_transport"],
    schoolId: "school-1",
  },
  {
    id: "2",
    email: "pierre.moreau@ecole.fr",
    name: "Dr. Pierre Moreau",
    role: "teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["manage_classes", "view_students", "manage_grades", "view_schedule"],
    schoolId: "school-1",
    classId: "terminale-s",
  },
  {
    id: "3",
    email: "marie.dubois@parent.fr",
    name: "Marie Dubois",
    role: "parent",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["view_child_info", "view_payments", "view_schedule"],
    schoolId: "school-1",
    studentIds: ["student-1"],
  },
  {
    id: "4",
    email: "emma.rousseau@student.fr",
    name: "Emma Rousseau",
    role: "student",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["view_own_info", "view_schedule", "view_grades"],
    schoolId: "school-1",
    classId: "seconde",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("auth_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("auth_user", JSON.stringify(foundUser))

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${foundUser.name}`,
      })

      setIsLoading(false)
      return true
    }

    toast({
      title: "Erreur de connexion",
      description: "Email ou mot de passe incorrect",
      variant: "destructive",
    })

    setIsLoading(false)
    return false
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      toast({
        title: "Erreur d'inscription",
        description: "Un compte avec cet email existe déjà",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      permissions: getDefaultPermissions(userData.role),
      schoolId: userData.schoolId,
      classId: userData.classId,
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("auth_user", JSON.stringify(newUser))

    toast({
      title: "Inscription réussie",
      description: `Bienvenue ${newUser.name}`,
    })

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    })
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false
  }

  const isRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isLoading,
        hasPermission,
        isRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function getDefaultPermissions(role: UserRole): string[] {
  switch (role) {
    case "admin":
      return ["manage_users", "manage_school", "view_all", "manage_payments", "manage_transport"]
    case "teacher":
      return ["manage_classes", "view_students", "manage_grades", "view_schedule"]
    case "parent":
      return ["view_child_info", "view_payments", "view_schedule"]
    case "student":
      return ["view_own_info", "view_schedule", "view_grades"]
    default:
      return []
  }
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
