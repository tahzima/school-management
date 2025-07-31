"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EnrollmentModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewEnrollmentOpen, setIsNewEnrollmentOpen] = useState(false)

  const enrollments = [
    {
      id: "ENR-001",
      studentName: "Emma Rousseau",
      parentName: "Marie Rousseau",
      email: "marie.rousseau@email.com",
      phone: "06 12 34 56 78",
      class: "Seconde",
      status: "pending",
      submissionDate: "2024-01-15",
      documents: ["Certificat médical", "Bulletins", "Photo d'identité"],
    },
    {
      id: "ENR-002",
      studentName: "Thomas Leroy",
      parentName: "Pierre Leroy",
      email: "pierre.leroy@email.com",
      phone: "06 98 76 54 32",
      class: "Première S",
      status: "approved",
      submissionDate: "2024-01-12",
      documents: ["Certificat médical", "Bulletins", "Photo d'identité", "Attestation assurance"],
    },
    {
      id: "ENR-003",
      studentName: "Léa Moreau",
      parentName: "Sophie Moreau",
      email: "sophie.moreau@email.com",
      phone: "06 11 22 33 44",
      class: "Terminale ES",
      status: "rejected",
      submissionDate: "2024-01-10",
      documents: ["Bulletins", "Photo d'identité"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle
      case "pending":
        return Clock
      case "rejected":
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Approuvée"
      case "pending":
        return "En attente"
      case "rejected":
        return "Rejetée"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Inscriptions</h1>
          <p className="text-gray-600 mt-1">Traitement des demandes d'inscription et réinscription</p>
        </div>
        <Dialog open={isNewEnrollmentOpen} onOpenChange={setIsNewEnrollmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Inscription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nouvelle Demande d'Inscription</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle demande d'inscription.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student-name">Nom de l'élève</Label>
                  <Input id="student-name" />
                </div>
                <div>
                  <Label htmlFor="student-firstname">Prénom de l'élève</Label>
                  <Input id="student-firstname" />
                </div>
              </div>
              <div>
                <Label htmlFor="birth-date">Date de naissance</Label>
                <Input id="birth-date" type="date" />
              </div>
              <div>
                <Label htmlFor="class-level">Niveau souhaité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconde">Seconde</SelectItem>
                    <SelectItem value="premiere-s">Première S</SelectItem>
                    <SelectItem value="premiere-es">Première ES</SelectItem>
                    <SelectItem value="premiere-l">Première L</SelectItem>
                    <SelectItem value="terminale-s">Terminale S</SelectItem>
                    <SelectItem value="terminale-es">Terminale ES</SelectItem>
                    <SelectItem value="terminale-l">Terminale L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parent-name">Nom du responsable</Label>
                  <Input id="parent-name" />
                </div>
                <div>
                  <Label htmlFor="parent-email">Email du responsable</Label>
                  <Input id="parent-email" type="email" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parent-phone">Téléphone</Label>
                  <Input id="parent-phone" />
                </div>
                <div>
                  <Label htmlFor="emergency-contact">Contact d'urgence</Label>
                  <Input id="emergency-contact" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Adresse complète</Label>
                <Textarea id="address" />
              </div>
              <div>
                <Label htmlFor="notes">Notes particulières</Label>
                <Textarea id="notes" placeholder="Allergies, besoins spéciaux, etc." />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsNewEnrollmentOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsNewEnrollmentOpen(false)}>Créer la demande</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Demandes</p>
                <p className="text-2xl font-bold text-blue-600">{enrollments.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {enrollments.filter((e) => e.status === "pending").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approuvées</p>
                <p className="text-2xl font-bold text-green-600">
                  {enrollments.filter((e) => e.status === "approved").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejetées</p>
                <p className="text-2xl font-bold text-red-600">
                  {enrollments.filter((e) => e.status === "rejected").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une demande d'inscription..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Demandes d'Inscription</CardTitle>
          <CardDescription>Liste de toutes les demandes d'inscription et leur statut</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Élève</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => {
                const StatusIcon = getStatusIcon(enrollment.status)
                return (
                  <TableRow key={enrollment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{enrollment.id}</TableCell>
                    <TableCell>{enrollment.studentName}</TableCell>
                    <TableCell>{enrollment.parentName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{enrollment.email}</div>
                        <div className="text-gray-500">{enrollment.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{enrollment.class}</Badge>
                    </TableCell>
                    <TableCell>{new Date(enrollment.submissionDate).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>
                      <div className="text-sm">{enrollment.documents.length} documents</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(enrollment.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusLabel(enrollment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                        {enrollment.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                              Approuver
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                              Rejeter
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
