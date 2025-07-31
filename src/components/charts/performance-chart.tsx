"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Euro, BarChart3, LineChart } from "lucide-react"
import { useState } from "react"

// Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export function PerformanceChart() {
  const [chartType, setChartType] = useState<"line" | "bar">("line")
  const [timeRange, setTimeRange] = useState<"6months" | "1year" | "2years">("1year")

  // Données simulées pour les performances
  const getChartData = () => {
    const baseData = {
      "6months": {
        labels: ["Août", "Sept", "Oct", "Nov", "Déc", "Jan"],
        inscriptions: [45, 52, 48, 61, 55, 67],
        revenus: [18500, 21200, 19800, 24500, 22000, 26800],
        satisfaction: [85, 87, 86, 89, 88, 91],
      },
      "1year": {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        inscriptions: [42, 38, 45, 52, 48, 55, 49, 58, 52, 48, 61, 67],
        revenus: [16800, 15200, 18000, 20800, 19200, 22000, 19600, 23200, 20800, 19200, 24400, 26800],
        satisfaction: [82, 81, 84, 86, 85, 87, 86, 88, 87, 86, 89, 91],
      },
      "2years": {
        labels: ["2023 Q1", "2023 Q2", "2023 Q3", "2023 Q4", "2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4"],
        inscriptions: [125, 155, 159, 178, 142, 162, 168, 185],
        revenus: [50000, 62000, 63600, 71200, 56800, 64800, 67200, 74000],
        satisfaction: [80, 83, 85, 87, 84, 87, 88, 90],
      },
    }

    return baseData[timeRange]
  }

  const data = getChartData()

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Nouvelles Inscriptions",
        data: data.inscriptions,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: chartType === "line",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Revenus (€)",
        data: data.revenus,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: chartType === "line",
        tension: 0.4,
        yAxisID: "y1",
      },
      {
        label: "Satisfaction (%)",
        data: data.satisfaction,
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: chartType === "line",
        tension: 0.4,
        yAxisID: "y2",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.dataset.label === "Revenus (€)") {
              label += new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(context.parsed.y)
            } else if (context.dataset.label === "Satisfaction (%)") {
              label += context.parsed.y + "%"
            } else {
              label += context.parsed.y
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Inscriptions",
          color: "rgb(59, 130, 246)",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y1: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        title: {
          display: true,
          text: "Revenus (€)",
          color: "rgb(16, 185, 129)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Satisfaction (%)",
          color: "rgb(245, 158, 11)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  // Calcul des statistiques
  const currentPeriodInscriptions = data.inscriptions[data.inscriptions.length - 1]
  const previousPeriodInscriptions = data.inscriptions[data.inscriptions.length - 2]
  const inscriptionsGrowth =
    ((currentPeriodInscriptions - previousPeriodInscriptions) / previousPeriodInscriptions) * 100

  const currentPeriodRevenue = data.revenus[data.revenus.length - 1]
  const previousPeriodRevenue = data.revenus[data.revenus.length - 2]
  const revenueGrowth = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100

  const currentSatisfaction = data.satisfaction[data.satisfaction.length - 1]
  const previousSatisfaction = data.satisfaction[data.satisfaction.length - 2]
  const satisfactionGrowth = currentSatisfaction - previousSatisfaction

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inscriptions</p>
                <p className="text-2xl font-bold text-blue-600">{currentPeriodInscriptions}</p>
                <div className="flex items-center gap-1 mt-1">
                  {inscriptionsGrowth >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${inscriptionsGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {inscriptionsGrowth >= 0 ? "+" : ""}
                    {inscriptionsGrowth.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(currentPeriodRevenue)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {revenueGrowth >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {revenueGrowth >= 0 ? "+" : ""}
                    {revenueGrowth.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-yellow-600">{currentSatisfaction}%</p>
                <div className="flex items-center gap-1 mt-1">
                  {satisfactionGrowth >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${satisfactionGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {satisfactionGrowth >= 0 ? "+" : ""}
                    {satisfactionGrowth.toFixed(1)} pts
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performances de l&apos;École
              </CardTitle>
              <CardDescription>Évolution des inscriptions, revenus et satisfaction</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Time Range Selector */}
              <div className="flex items-center gap-1">
                <Button
                  variant={timeRange === "6months" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("6months")}
                >
                  6M
                </Button>
                <Button
                  variant={timeRange === "1year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("1year")}
                >
                  1A
                </Button>
                <Button
                  variant={timeRange === "2years" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("2years")}
                >
                  2A
                </Button>
              </div>

              {/* Chart Type Selector */}
              <div className="flex items-center gap-1">
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                >
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {chartType === "line" ? (
              <Line data={chartData} options={options} />
            ) : (
              <Bar data={chartData} options={options} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📈 Tendances Positives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="default" className="bg-green-100 text-green-800">
                +{inscriptionsGrowth.toFixed(1)}%
              </Badge>
              <span className="text-sm">Croissance des inscriptions</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="bg-green-100 text-green-800">
                +{revenueGrowth.toFixed(1)}%
              </Badge>
              <span className="text-sm">Augmentation des revenus</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="bg-green-100 text-green-800">
                {currentSatisfaction}%
              </Badge>
              <span className="text-sm">Taux de satisfaction élevé</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎯 Objectifs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Inscriptions mensuelles</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(currentPeriodInscriptions / 80) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{currentPeriodInscriptions}/80</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenus mensuels</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(currentPeriodRevenue / 30000) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{Math.round((currentPeriodRevenue / 30000) * 100)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Satisfaction</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${currentSatisfaction}%` }}></div>
                </div>
                <span className="text-xs text-gray-600">{currentSatisfaction}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
