"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Video, Calendar, Filter, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { useCartaoKwaiData } from "../../services/api"
import Loading from "../../components/Loading/Loading"
import CreativeModalKwai from "./CreativeModalKwai"

interface CreativeData {
  time: string
  campaignName: string
  adSetName: string
  creativeName: string
  cost: number
  impressions: number
  clicks: number
  videoPlaysComplete: number
  videoPlays3s: number
  videoPlays5s: number
  thruPlays: number
  totalEngagement: number
  newFollowers: number
  profileVisits: number
  comments: number
  shares: number
  likes: number
}

type SortKey = "impressions" | "clicks" | "cost" | "ctr" | "totalEngagement"
type SortDir = "desc" | "asc"

const SortIcon: React.FC<{ col: SortKey; sortKey: SortKey; sortDir: SortDir }> = ({ col, sortKey, sortDir }) => {
  if (col !== sortKey) return <ChevronsUpDown className="w-3 h-3 ml-1 opacity-40" />
  return sortDir === "desc" ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronUp className="w-3 h-3 ml-1" />
}

const CriativosKwai: React.FC = () => {
  const { data: apiData, loading, error } = useCartaoKwaiData()

  const [processedData, setProcessedData] = useState<CreativeData[]>([])
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" })
  const [selectedCampaign, setSelectedCampaign] = useState<string>("")
  const [availableCampaigns, setAvailableCampaigns] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortKey, setSortKey] = useState<SortKey>("impressions")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [selectedCreative, setSelectedCreative] = useState<CreativeData | null>(null)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) { setSortDir(d => d === "desc" ? "asc" : "desc") }
    else { setSortKey(key); setSortDir("desc") }
    setCurrentPage(1)
  }

  useEffect(() => {
    if (apiData?.success && apiData?.data?.values) {
      const headers = apiData.data.values[0]
      const rows = apiData.data.values.slice(1)

      const parseNumber = (value: string) => {
        if (!value || value === "") return 0
        return Number.parseFloat(value.replace(/[R$\s.]/g, "").replace(",", ".")) || 0
      }

      const parseInteger = (value: string) => {
        if (!value || value === "") return 0
        return Number.parseInt(value.replace(/[.\s]/g, "").replace(",", "")) || 0
      }

      const processed: CreativeData[] = rows
        .map((row: string[]) => ({
          time: row[headers.indexOf("Time")] || "",
          campaignName: row[headers.indexOf("Campaign name")] || "",
          adSetName: row[headers.indexOf("Ad Set Name")] || "",
          creativeName: row[headers.indexOf("Creative name")]?.trim() || "",
          cost: parseNumber(row[headers.indexOf("Cost(BRL)")]),
          impressions: parseInteger(row[headers.indexOf("Impression")]),
          clicks: parseInteger(row[headers.indexOf("Click")]),
          videoPlaysComplete: parseInteger(row[headers.indexOf("Counts of video played to its completion")]),
          videoPlays3s: parseInteger(row[headers.indexOf("3s Video Plays")]),
          videoPlays5s: parseInteger(row[headers.indexOf("5s Video Plays")]),
          thruPlays: parseInteger(row[headers.indexOf("ThruPlays")]),
          totalEngagement: parseInteger(row[headers.indexOf("Total Engagement")]),
          newFollowers: parseInteger(row[headers.indexOf("New Followers")]),
          profileVisits: parseInteger(row[headers.indexOf("Profile Visits")]),
          comments: parseInteger(row[headers.indexOf("Comments")]),
          shares: parseInteger(row[headers.indexOf("Shares")]),
          likes: parseInteger(row[headers.indexOf("Likes")]),
        } as CreativeData))
        .filter((item: CreativeData) => item.time && item.impressions > 0)

      setProcessedData(processed)

      if (processed.length > 0) {
        const dates = processed.map((item) => new Date(item.time)).sort((a, b) => a.getTime() - b.getTime())
        setDateRange({
          start: dates[0].toISOString().split("T")[0],
          end: dates[dates.length - 1].toISOString().split("T")[0],
        })
      }

      const campaignSet = new Set<string>()
      processed.forEach((item) => { if (item.campaignName) campaignSet.add(item.campaignName) })
      setAvailableCampaigns(Array.from(campaignSet).filter(Boolean))
    }
  }, [apiData])

  const filteredData = useMemo(() => {
    let filtered = processedData

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.time)
        return itemDate >= new Date(dateRange.start) && itemDate <= new Date(dateRange.end)
      })
    }

    if (selectedCampaign) {
      filtered = filtered.filter((item) => item.campaignName.includes(selectedCampaign))
    }

    const groupedData: Record<string, CreativeData> = {}
    filtered.forEach((item) => {
      const key = `${item.creativeName}_${item.adSetName}`
      if (!groupedData[key]) {
        groupedData[key] = { ...item }
      } else {
        groupedData[key].cost += item.cost
        groupedData[key].impressions += item.impressions
        groupedData[key].clicks += item.clicks
        groupedData[key].videoPlaysComplete += item.videoPlaysComplete
        groupedData[key].videoPlays3s += item.videoPlays3s
        groupedData[key].videoPlays5s += item.videoPlays5s
        groupedData[key].thruPlays += item.thruPlays
        groupedData[key].totalEngagement += item.totalEngagement
        groupedData[key].newFollowers += item.newFollowers
        groupedData[key].profileVisits += item.profileVisits
        groupedData[key].comments += item.comments
        groupedData[key].shares += item.shares
        groupedData[key].likes += item.likes
      }
    })

    const finalData = Object.values(groupedData)
    finalData.sort((a, b) => {
      let va = 0, vb = 0
      if (sortKey === "impressions") { va = a.impressions; vb = b.impressions }
      else if (sortKey === "clicks") { va = a.clicks; vb = b.clicks }
      else if (sortKey === "cost") { va = a.cost; vb = b.cost }
      else if (sortKey === "totalEngagement") { va = a.totalEngagement; vb = b.totalEngagement }
      else if (sortKey === "ctr") {
        va = a.impressions > 0 ? a.clicks / a.impressions : 0
        vb = b.impressions > 0 ? b.clicks / b.impressions : 0
      }
      return sortDir === "desc" ? vb - va : va - vb
    })
    return finalData
  }, [processedData, selectedCampaign, dateRange, sortKey, sortDir])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const totals = useMemo(() => {
    const investment = filteredData.reduce((sum, item) => sum + item.cost, 0)
    const impressions = filteredData.reduce((sum, item) => sum + item.impressions, 0)
    const clicks = filteredData.reduce((sum, item) => sum + item.clicks, 0)
    const totalEngagement = filteredData.reduce((sum, item) => sum + item.totalEngagement, 0)
    const videoPlays3s = filteredData.reduce((sum, item) => sum + item.videoPlays3s, 0)
    const thruPlays = filteredData.reduce((sum, item) => sum + item.thruPlays, 0)
    return {
      investment, impressions, clicks, totalEngagement, videoPlays3s, thruPlays,
      avgCpm: impressions > 0 ? investment / (impressions / 1000) : 0,
      avgCpc: clicks > 0 ? investment / clicks : 0,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
    }
  }, [filteredData])

  const formatNumber = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toLocaleString("pt-BR")
  }

  const formatCurrency = (value: number): string =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const truncateText = (text: string, maxLength: number): string =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "..."

  if (loading) return <Loading message="Carregando criativos Kwai..." />

  if (error) {
    return (
      <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erro ao carregar dados: {error?.message}</p>
      </div>
    )
  }

  const thClass = "py-3 px-4 font-semibold cursor-pointer select-none hover:bg-yellow-600 transition-colors"

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-enhanced">Criativos Kwai</h1>
            <p className="text-gray-600">Performance dos criativos na plataforma Kwai</p>
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg">
          Última atualização: {new Date().toLocaleString("pt-BR")}
        </div>
      </div>

      {/* Filtros */}
      <div className="card-overlay rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />Período
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={dateRange.start}
                onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"/>
              <input type="date" value={dateRange.end}
                onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Filter className="w-4 h-4 mr-2" />Campanha
            </label>
            <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm">
              <option value="">Todas as campanhas</option>
              {availableCampaigns.map((campaign, index) => (
                <option key={index} value={campaign}>{truncateText(campaign, 50)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
        {[
          { label: "Investimento", value: formatCurrency(totals.investment) },
          { label: "Impressões", value: formatNumber(totals.impressions) },
          { label: "Cliques", value: formatNumber(totals.clicks) },
          { label: "CPM", value: formatCurrency(totals.avgCpm) },
          { label: "CPC", value: formatCurrency(totals.avgCpc) },
          { label: "CTR", value: `${totals.ctr.toFixed(2)}%` },
          { label: "Engajamentos", value: formatNumber(totals.totalEngagement) },
          { label: "Vídeos 3s", value: formatNumber(totals.videoPlays3s) },
          { label: "ThruPlays", value: formatNumber(totals.thruPlays) },
        ].map((m) => (
          <div key={m.label} className="card-overlay rounded-lg shadow-lg p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">{m.label}</div>
            <div className="text-lg font-bold text-gray-900">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Tabela de Criativos */}
      <div className="flex-1 card-overlay rounded-lg shadow-lg p-6">
        <div className="mb-3">
          <p className="text-sm font-bold text-gray-800">Criativos ({filteredData.length})</p>
          <p className="text-xs text-gray-400 mt-0.5">Clique no cabeçalho para ordenar. Clique na linha para ver detalhes.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-yellow-500 text-white">
                <th className="text-left py-3 px-4 font-semibold rounded-l-lg">Criativo</th>
                <th className={`text-right ${thClass}`} onClick={() => handleSort("cost")}>
                  <div className="flex items-center justify-end">Investimento<SortIcon col="cost" sortKey={sortKey} sortDir={sortDir}/></div>
                </th>
                <th className={`text-right ${thClass}`} onClick={() => handleSort("impressions")}>
                  <div className="flex items-center justify-end">Impressões<SortIcon col="impressions" sortKey={sortKey} sortDir={sortDir}/></div>
                </th>
                <th className={`text-right ${thClass}`} onClick={() => handleSort("clicks")}>
                  <div className="flex items-center justify-end">Cliques<SortIcon col="clicks" sortKey={sortKey} sortDir={sortDir}/></div>
                </th>
                <th className={`text-right ${thClass}`} onClick={() => handleSort("ctr")}>
                  <div className="flex items-center justify-end">CTR<SortIcon col="ctr" sortKey={sortKey} sortDir={sortDir}/></div>
                </th>
                <th className={`text-right ${thClass} rounded-r-lg`} onClick={() => handleSort("totalEngagement")}>
                  <div className="flex items-center justify-end">Engajamento<SortIcon col="totalEngagement" sortKey={sortKey} sortDir={sortDir}/></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((creative, index) => {
                const ctr = creative.impressions > 0 ? (creative.clicks / creative.impressions) * 100 : 0
                return (
                  <tr key={index}
                    className={`${index % 2 === 0 ? "bg-yellow-50" : "bg-white"} cursor-pointer hover:bg-yellow-100/60 transition-colors`}
                    onClick={() => setSelectedCreative(creative)}>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900 text-sm leading-tight whitespace-normal break-words">{creative.creativeName}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-normal break-words">{creative.campaignName}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-normal break-words">{creative.adSetName}</p>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold min-w-[7.5rem]">{formatCurrency(creative.cost)}</td>
                    <td className="py-3 px-4 text-right min-w-[7.5rem]">{formatNumber(creative.impressions)}</td>
                    <td className="py-3 px-4 text-right min-w-[7.5rem]">{formatNumber(creative.clicks)}</td>
                    <td className="py-3 px-4 text-right min-w-[7.5rem]">{ctr.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-right min-w-[7.5rem]">{formatNumber(creative.totalEngagement)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} –{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} criativos
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Anterior</button>
            <span className="px-3 py-1 text-sm text-gray-600">{currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Próximo</button>
          </div>
        </div>
      </div>

      <CreativeModalKwai
        creative={selectedCreative}
        isOpen={selectedCreative !== null}
        onClose={() => setSelectedCreative(null)}
      />
    </div>
  )
}

export default CriativosKwai
