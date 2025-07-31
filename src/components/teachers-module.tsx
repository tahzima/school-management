"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, BookOpen, Calendar, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthGuard } from "@/components/auth/auth-guard"

export function TeachersModule() {
  const [searchTerm, setSearchTerm] = useState("")

  const teachers = [
    {
      id: 1,
      name: "Dr. Pierre Moreau",
      email: "pierre.moreau@ecole.fr",
      phone: "01 23 45 67 89",
      subject: "Mathématiques",
      classes: ["Terminale S", "Première S"],
      status: "active",
      experience: "15 ans",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mme. Claire Dubois",
      email: "claire.dubois@ecole.fr",
      phone: "01 98 76 54 32",
      subject: "Français",
      classes: ["Seconde", "Première L"],
      status: "active",
      experience: "8 ans",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "M. Antoine Bernard",
      email: "antoine.bernard@ecole.fr",
      phone: "01 11 22 33 44",
      subject: "Histoire-Géographie",
      classes: ["Terminale ES", "Première ES"],
      status: "congé",
      experience: "12 ans",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AuthGuard requiredPermission="manage_users">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Professeurs</h1>
            <p className="text-gray-600 mt-1">Gérez votre équipe pédagogique</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Professeur
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un professeur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, index) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Planning
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <BookOpen className="h-3 w-3" />
                    {teacher.subject}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3 w-3" />
                    {teacher.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3 w-3" />
                    {teacher.phone}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Classes assignées:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map((className, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {className}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-gray-600">Expérience: </span>
                    <span className="font-medium">{teacher.experience}</span>
                  </div>
                  <Badge variant={teacher.status === "active" ? "default" : "outline"}>
                    {teacher.status === "active" ? "Actif" : "En congé"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthGuard>
  )
}
