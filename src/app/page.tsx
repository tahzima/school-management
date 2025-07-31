"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, GraduationCap, Calendar, CreditCard, Bus, BookOpen, UserCheck, Clock } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { StudentsModule } from "@/components/students-module"
import { TeachersModule } from "@/components/teachers-module"
import { ScheduleModule } from "@/components/schedule-module"
import { PaymentsModule } from "@/components/payments-module"
import { TransportModule } from "@/components/transport-module"
import { CoursesModule } from "@/components/courses-module"
import { RoomsModule } from "@/components/rooms-module"
import { EnrollmentModule } from "@/components/enrollment-module"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { AuthGuard } from "@/components/auth/auth-guard"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { PerformanceChart } from "@/components/charts/performance-chart"

export default function SchoolManagement() {
  const { user, isLoading } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const [activeModule, setActiveModule] = useState("dashboard")

  const stats = [
    { title: "Total Élèves", value: "1,247", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Professeurs", value: "89", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
    { title: "Cours Actifs", value: "156", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Revenus Mensuel", value: "€45,230", icon: CreditCard, color: "text-orange-600", bg: "bg-orange-50" },
  ]

  const recentActivities = [
    { type: "inscription", student: "Marie Dubois", time: "Il y a 2h", status: "completed" },
    { type: "paiement", student: "Jean Martin", time: "Il y a 3h", status: "pending" },
    { type: "cours", student: "Sophie Laurent", time: "Il y a 5h", status: "completed" },
    { type: "transport", student: "Lucas Bernard", time: "Il y a 1j", status: "active" },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return authMode === "login" ? (
      <LoginForm onToggleMode={() => setAuthMode("register")} />
    ) : (
      <RegisterForm onToggleMode={() => setAuthMode("login")} />
    )
  }

  const renderModule = () => {
    switch (activeModule) {
      case "students":
        return <StudentsModule />
      case "teachers":
        return <TeachersModule />
      case "schedule":
        return <ScheduleModule />
      case "payments":
        return <PaymentsModule />
      case "transport":
        return <TransportModule />
      case "courses":
        return <CoursesModule />
      case "rooms":
        return <RoomsModule />
      case "enrollment":
        return <EnrollmentModule />
      default:
        return (
          <AuthGuard requiredPermission="view_all">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
                  <p className="text-gray-600 mt-1">Vue d'ensemble de votre établissement scolaire</p>
                </div>
                <div className="flex items-center gap-3">
                  <NotificationCenter />
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bg}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Activités Récentes
                    </CardTitle>
                    <CardDescription>Dernières actions dans le système</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <div>
                              <p className="font-medium text-gray-900">{activity.student}</p>
                              <p className="text-sm text-gray-600 capitalize">{activity.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                activity.status === "completed"
                                  ? "default"
                                  : activity.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {activity.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions Rapides</CardTitle>
                    <CardDescription>Accès rapide aux fonctions principales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setActiveModule("enrollment")}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Nouvelle Inscription
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setActiveModule("payments")}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Enregistrer Paiement
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setActiveModule("schedule")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Planifier Cours
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setActiveModule("transport")}
                    >
                      <Bus className="h-4 w-4 mr-2" />
                      Gérer Transport
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <PerformanceChart />
            </div>
          </AuthGuard>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderModule()}</div>
      </main>
    </div>
  )
}
