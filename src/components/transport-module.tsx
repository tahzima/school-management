"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bus, Plus, MapPin, Clock, Users, Route, AlertCircle } from "lucide-react"

export function TransportModule() {
  const routes = [
    {
      id: "R001",
      name: "Ligne Centre-Ville",
      driver: "Michel Durand",
      capacity: 45,
      occupied: 38,
      status: "active",
      stops: ["Place de la République", "Gare SNCF", "Lycée", "Collège"],
      schedule: "07:30 - 17:00",
    },
    {
      id: "R002",
      name: "Ligne Banlieue Nord",
      driver: "Sophie Martin",
      capacity: 50,
      occupied: 42,
      status: "active",
      stops: ["Zone Industrielle", "Quartier Résidentiel", "Lycée"],
      schedule: "07:45 - 16:45",
    },
    {
      id: "R003",
      name: "Ligne Sud",
      driver: "Pierre Moreau",
      capacity: 40,
      occupied: 25,
      status: "maintenance",
      stops: ["Village Sud", "Centre Commercial", "Lycée"],
      schedule: "08:00 - 17:15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOccupancyColor = (occupied: number, capacity: number) => {
    const percentage = (occupied / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Transport</h1>
          <p className="text-gray-600 mt-1">Suivi des lignes de transport scolaire</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Ligne
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lignes Actives</p>
                <p className="text-2xl font-bold text-blue-600">{routes.filter((r) => r.status === "active").length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Élèves Transportés</p>
                <p className="text-2xl font-bold text-green-600">{routes.reduce((sum, r) => sum + r.occupied, 0)}</p>
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
                <p className="text-sm font-medium text-gray-600">Capacité Totale</p>
                <p className="text-2xl font-bold text-purple-600">{routes.reduce((sum, r) => sum + r.capacity, 0)}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Route className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Maintenance</p>
                <p className="text-2xl font-bold text-orange-600">
                  {routes.filter((r) => r.status === "maintenance").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-50">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routes List */}
      <div className="grid gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <Bus className="h-5 w-5 text-blue-600" />
                    {route.name}
                    <Badge variant="outline" className="ml-2">
                      {route.id}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">Conducteur: {route.driver}</CardDescription>
                </div>
                <Badge className={getStatusColor(route.status)}>
                  {route.status === "active" ? "Actif" : route.status === "maintenance" ? "Maintenance" : "Inactif"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Occupancy */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Occupation</p>
                    <p className="text-sm text-gray-600">
                      <span className={getOccupancyColor(route.occupied, route.capacity)}>{route.occupied}</span>/
                      {route.capacity} places
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (route.occupied / route.capacity) >= 0.9
                          ? "bg-red-500"
                          : route.occupied / route.capacity >= 0.75
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(route.occupied / route.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((route.occupied / route.capacity) * 100)}% occupé
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Horaires</p>
                  <p className="text-sm text-blue-700">{route.schedule}</p>
                </div>
              </div>

              {/* Stops */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Arrêts ({route.stops.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {route.stops.map((stop, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {index + 1}. {stop}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  Voir Détails
                </Button>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  Gérer Élèves
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
