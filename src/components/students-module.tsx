"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, MapPin, Edit, Trash2, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthGuard } from "@/components/auth/auth-guard"

export function StudentsModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const students = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "06 12 34 56 78",
      class: "Terminale S",
      status: "active",
      address: "123 Rue de la Paix, Paris",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@email.com",
      phone: "06 98 76 54 32",
      class: "Première ES",
      status: "active",
      address: "456 Avenue des Champs, Lyon",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      email: "sophie.laurent@email.com",
      phone: "06 11 22 33 44",
      class: "Seconde",
      status: "inactive",
      address: "789 Boulevard Victor Hugo, Marseille",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AuthGuard requiredPermission="view_students">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Élèves</h1>
            <p className="text-gray-600 mt-1">Gérez les informations de vos élèves</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Élève
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel élève</DialogTitle>
                <DialogDescription>Remplissez les informations de l&apos;élève ci-dessous.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Téléphone
                  </Label>
                  <Input id="phone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Classe
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconde">Seconde</SelectItem>
                      <SelectItem value="premiere-s">Première S</SelectItem>
                      <SelectItem value="premiere-es">Première ES</SelectItem>
                      <SelectItem value="terminale-s">Terminale S</SelectItem>
                      <SelectItem value="terminale-es">Terminale ES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Ajouter</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un élève..."
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

        {/* Students List */}
        <div className="grid gap-4">
          {filteredStudents.map((student, index) => (
            <Card key={student.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {student.address}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.class}</Badge>
                    <Badge variant={student.status === "active" ? "default" : "outline"}>
                      {student.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
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
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun élève trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGuard>
  )
}
