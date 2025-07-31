"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, CreditCard, Euro, Calendar, User, Download, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AuthGuard } from "@/components/auth/auth-guard"

export function PaymentsModule() {
  const [searchTerm, setSearchTerm] = useState("")

  const payments = [
    {
      id: "PAY-001",
      student: "Marie Dubois",
      amount: 450,
      type: "Frais de scolarité",
      status: "payé",
      date: "2024-01-15",
      method: "Carte bancaire",
    },
    {
      id: "PAY-002",
      student: "Jean Martin",
      amount: 120,
      type: "Cantine",
      status: "en_attente",
      date: "2024-01-14",
      method: "Virement",
    },
    {
      id: "PAY-003",
      student: "Sophie Laurent",
      amount: 80,
      type: "Transport",
      status: "payé",
      date: "2024-01-13",
      method: "Espèces",
    },
    {
      id: "PAY-004",
      student: "Lucas Bernard",
      amount: 200,
      type: "Activités extra-scolaires",
      status: "en_retard",
      date: "2024-01-10",
      method: "Chèque",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "payé":
        return "bg-green-100 text-green-800"
      case "en_attente":
        return "bg-yellow-100 text-yellow-800"
      case "en_retard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "payé":
        return "Payé"
      case "en_attente":
        return "En attente"
      case "en_retard":
        return "En retard"
      default:
        return status
    }
  }

  const totalRevenue = payments.filter((p) => p.status === "payé").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "en_attente").reduce((sum, p) => sum + p.amount, 0)
  const overdueAmount = payments.filter((p) => p.status === "en_retard").reduce((sum, p) => sum + p.amount, 0)

  return (
    <AuthGuard requiredPermission="manage_payments">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
            <p className="text-gray-600 mt-1">Suivi des paiements et facturation</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Paiement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus Totaux</p>
                  <p className="text-2xl font-bold text-green-600">€{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <Euro className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Attente</p>
                  <p className="text-2xl font-bold text-yellow-600">€{pendingAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-50">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Retard</p>
                  <p className="text-2xl font-bold text-red-600">€{overdueAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-red-50">
                  <CreditCard className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transactions</p>
                  <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un paiement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Paiements</CardTitle>
            <CardDescription>Liste de tous les paiements et leur statut</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Élève</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.student}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell className="font-medium">€{payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>{getStatusLabel(payment.status)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
