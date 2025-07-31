"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Plus, Users, Monitor, Volume2, Calendar } from "lucide-react"

export function RoomsModule() {
  const rooms = [
    {
      id: "A101",
      name: "Salle de Mathématiques A101",
      capacity: 30,
      type: "Cours magistral",
      floor: "1er étage - Bâtiment A",
      status: "available",
      equipment: ["Tableau interactif", "Projecteur", "WiFi", "Climatisation"],
      currentClass: null,
      nextClass: "Mathématiques - 14h00",
    },
    {
      id: "B205",
      name: "Laboratoire de Physique B205",
      capacity: 24,
      type: "Laboratoire",
      floor: "2ème étage - Bâtiment B",
      status: "occupied",
      equipment: ["Paillasses", "Hotte", "Matériel scientifique", "Projecteur"],
      currentClass: "Physique-Chimie 1ère S",
      nextClass: "Libre - 16h00",
    },
    {
      id: "C301",
      name: "Salle de Français C301",
      capacity: 35,
      type: "Cours magistral",
      floor: "3ème étage - Bâtiment C",
      status: "available",
      equipment: ["Tableau blanc", "Projecteur", "WiFi", "Système audio"],
      currentClass: null,
      nextClass: "Français 2nde - 15h30",
    },
    {
      id: "INFO1",
      name: "Salle Informatique",
      capacity: 20,
      type: "Informatique",
      floor: "Rez-de-chaussée - Bâtiment A",
      status: "maintenance",
      equipment: ["20 PC", "Serveur", "Projecteur", "WiFi", "Imprimante"],
      currentClass: null,
      nextClass: "Maintenance jusqu'à 16h00",
    },
    {
      id: "GYM",
      name: "Gymnase",
      capacity: 60,
      type: "Sport",
      floor: "Bâtiment sportif",
      status: "occupied",
      equipment: ["Matériel sportif", "Vestiaires", "Douches", "Sono"],
      currentClass: "EPS Terminale",
      nextClass: "EPS 1ère - 16h00",
    },
    {
      id: "AUD",
      name: "Amphithéâtre",
      capacity: 120,
      type: "Conférence",
      floor: "Rez-de-chaussée - Bâtiment principal",
      status: "available",
      equipment: ["Système audio", "Projecteur HD", "Éclairage scénique", "WiFi"],
      currentClass: null,
      nextClass: "Conférence - 17h00",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible"
      case "occupied":
        return "Occupée"
      case "maintenance":
        return "Maintenance"
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Laboratoire":
        return Monitor
      case "Informatique":
        return Monitor
      case "Sport":
        return Users
      case "Conférence":
        return Volume2
      default:
        return Building
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Salles</h1>
          <p className="text-gray-600 mt-1">Organisation et réservation des espaces</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Salle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Salles</p>
                <p className="text-2xl font-bold text-blue-600">{rooms.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">
                  {rooms.filter((r) => r.status === "available").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupées</p>
                <p className="text-2xl font-bold text-red-600">{rooms.filter((r) => r.status === "occupied").length}</p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Capacité Totale</p>
                <p className="text-2xl font-bold text-purple-600">{rooms.reduce((sum, r) => sum + r.capacity, 0)}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const TypeIcon = getTypeIcon(room.type)
          return (
            <Card key={room.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TypeIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription>{room.floor}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(room.status)}>{getStatusLabel(room.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Room Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{room.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacité</p>
                    <p className="font-medium">{room.capacity} places</p>
                  </div>
                </div>

                {/* Current Status */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">État actuel</span>
                  </div>
                  {room.currentClass ? (
                    <p className="text-sm text-red-600 font-medium">En cours: {room.currentClass}</p>
                  ) : (
                    <p className="text-sm text-green-600 font-medium">Libre</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Prochain: {room.nextClass}</p>
                </div>

                {/* Equipment */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Équipements</p>
                  <div className="flex flex-wrap gap-1">
                    {room.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Réserver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Planning
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
