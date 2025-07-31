"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole
  requiredPermission?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ children, requiredRole, requiredPermission, fallback }: AuthGuardProps) {
  const { user, hasPermission, isRole } = useAuth()

  if (!user) {
    return null // Will be handled by the main auth flow
  }

  // Check role requirement
  if (requiredRole && !isRole(requiredRole)) {
    return (
      fallback || (
        <Card className="m-6">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accès non autorisé</h3>
            <p className="text-gray-600">Vous n&apos;avez pas les permissions nécessaires pour accéder à cette section.</p>
          </CardContent>
        </Card>
      )
    )
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      fallback || (
        <Card className="m-6">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Permission requise</h3>
            <p className="text-gray-600">
              Vous n&apos;avez pas la permission &apos;{requiredPermission}&apos; pour accéder à cette fonctionnalité.
            </p>
          </CardContent>
        </Card>
      )
    )
  }

  return <>{children}</>
}
