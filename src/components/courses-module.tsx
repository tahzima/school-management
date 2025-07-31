"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, BookOpen, User, Clock, Users, Calendar } from "lucide-react"

export function CoursesModule() {
  const [searchTerm, setSearchTerm] = useState("")

  const courses = [
    {
      id: "MATH-TS",
      name: "Mathématiques Terminale S",
      teacher: "Dr. Pierre Moreau",
      students: 28,
      duration: "4h/semaine",
      room: "A101",
      schedule: "Lun 9h-11h, Mer 14h-16h",
      status: "active",
      description: "Analyse, géométrie, probabilités et statistiques",
    },
    {
      id: "PHYS-1S",
      name: "Physique-Chimie 1ère S",
      teacher: "Mme. Claire Laurent",
      students: 24,
      duration: "3h/semaine",
      room: "B205",
      schedule: "Mar 10h-12h, Ven 15h-16h",
      status: "active",
      description: "Mécanique, électricité et chimie organique",
    },
    {
      id: "FRAN-2",
      name: "Français Seconde",
      teacher: "Mme. Claire Dubois",
      students: 32,
      duration: "4h/semaine",
      room: "C301",
      schedule: "Lun 14h-16h, Jeu 9h-11h",
      status: "active",
      description: "Littérature française et expression écrite",
    },
    {
      id: "HIST-TES",
      name: "Histoire-Géographie Term ES",
      teacher: "M. Antoine Bernard",
      students: 26,
      duration: "4h/semaine",
      room: "A203",
      schedule: "Mar 8h-10h, Ven 10h-12h",
      status: "suspended",
      description: "Histoire contemporaine et géographie économique",
    },
  ]

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "planned":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Cours</h1>
          <p className="text-gray-600 mt-1">Organisation des matières et programmes</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un cours..."
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    {course.name}
                  </CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(course.status)}>
                  {course.status === "active" ? "Actif" : course.status === "suspended" ? "Suspendu" : "Planifié"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Teacher Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{course.teacher}</p>
                  <p className="text-sm text-gray-600">Professeur responsable</p>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">{course.students} élèves</p>
                    <p className="text-xs text-gray-500">Inscrits</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{course.duration}</p>
                    <p className="text-xs text-gray-500">Durée</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-900">Horaires</span>
                </div>
                <p className="text-sm text-indigo-700">{course.schedule}</p>
                <p className="text-xs text-indigo-600 mt-1">Salle: {course.room}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Voir Détails
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
