"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react"

export function ScheduleModule() {
  const [currentWeek, setCurrentWeek] = useState(0)

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

  const schedule = {
    Lundi: {
      "09:00": { subject: "Mathématiques", teacher: "Dr. Moreau", room: "A101", class: "Terminale S" },
      "10:00": { subject: "Physique", teacher: "Mme. Laurent", room: "B205", class: "Première S" },
      "14:00": { subject: "Français", teacher: "Mme. Dubois", room: "C301", class: "Seconde" },
    },
    Mardi: {
      "08:00": { subject: "Histoire", teacher: "M. Bernard", room: "A203", class: "Terminale ES" },
      "11:00": { subject: "Anglais", teacher: "Ms. Smith", room: "B102", class: "Première L" },
      "15:00": { subject: "SVT", teacher: "Dr. Martin", room: "Lab1", class: "Seconde" },
    },
    Mercredi: {
      "09:00": { subject: "Mathématiques", teacher: "Dr. Moreau", room: "A101", class: "Première S" },
      "13:00": { subject: "Sport", teacher: "M. Durand", room: "Gymnase", class: "Toutes classes" },
    },
    Jeudi: {
      "10:00": { subject: "Philosophie", teacher: "Mme. Rousseau", room: "C205", class: "Terminale" },
      "14:00": { subject: "Chimie", teacher: "Dr. Blanc", room: "Lab2", class: "Première S" },
      "16:00": { subject: "Arts", teacher: "Mme. Monet", room: "Atelier", class: "Seconde" },
    },
    Vendredi: {
      "08:00": { subject: "Économie", teacher: "M. Dupont", room: "A305", class: "Terminale ES" },
      "09:00": { subject: "Littérature", teacher: "Mme. Dubois", room: "C301", class: "Première L" },
      "15:00": { subject: "Informatique", teacher: "M. Tech", room: "Salle Info", class: "Toutes classes" },
    },
  }

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Mathématiques: "bg-blue-100 text-blue-800 border-blue-200",
      Physique: "bg-purple-100 text-purple-800 border-purple-200",
      Français: "bg-green-100 text-green-800 border-green-200",
      Histoire: "bg-orange-100 text-orange-800 border-orange-200",
      Anglais: "bg-red-100 text-red-800 border-red-200",
      SVT: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Sport: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Philosophie: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Chimie: "bg-pink-100 text-pink-800 border-pink-200",
      Arts: "bg-rose-100 text-rose-800 border-rose-200",
      Économie: "bg-teal-100 text-teal-800 border-teal-200",
      Littérature: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Informatique: "bg-slate-100 text-slate-800 border-slate-200",
    }
    return colors[subject] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emploi du Temps</h1>
          <p className="text-gray-600 mt-1">Planification des cours et gestion des créneaux</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Semaine précédente
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="font-medium">Semaine du 15 - 19 Janvier 2024</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
              Semaine suivante
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 border-b">
                <div className="p-4 font-medium text-gray-900 bg-gray-50">Horaires</div>
                {weekDays.map((day) => (
                  <div key={day} className="p-4 font-medium text-gray-900 bg-gray-50 text-center border-l">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-6 border-b hover:bg-gray-50 transition-colors">
                  <div className="p-4 font-medium text-gray-600 bg-gray-25 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {time}
                  </div>
                  {weekDays.map((day) => {
                    const lesson = schedule[day as keyof typeof schedule]?.[time]
                    return (
                      <div key={`${day}-${time}`} className="p-2 border-l min-h-[80px]">
                        {lesson && (
                          <div
                            className={`p-3 rounded-lg border-2 h-full ${getSubjectColor(lesson.subject)} hover:shadow-md transition-all cursor-pointer`}
                          >
                            <div className="font-medium text-sm mb-1">{lesson.subject}</div>
                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {lesson.teacher}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {lesson.room}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {lesson.class}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cours cette semaine</p>
                <p className="text-xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Professeurs actifs</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Salles utilisées</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Heures totales</p>
                <p className="text-xl font-bold">156h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
        