"use client"

import React, { useState } from "react"
import axios from "axios"

const API_BASE_URL = "https://losningtech-api.vercel.app"
const SHEET_ID = "10mT8Zr_HmRAjjfUrOYbd7nyyT_si2iGV6NOXHNXpKqw"

export const consolidadoApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

consolidadoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

export interface ConsolidadoData {
  success: boolean
  data: {
    range: string
    majorDimension: string
    values: string[][]
  }
}

// ─── Fetch functions ────────────────────────────────────────────────────────

export const fetchConsolidadoGeral = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Consolidado&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchMetaCreatives = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Meta&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInCreatives = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=LinkedIn&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchTikTokCreatives = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=TikTok&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGoogleSearchCreatives = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Google%20-%20Search&range=A1%3AAZ20000`
  )
  return response.data
}

export const useGoogleSearchData = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchGoogleSearchCreatives())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const fetchGooglePMaxCreatives = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Google%20-%20PMAX&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGA4 = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=GA4&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGA4Eventos = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=GA4%20-%20Eventos&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGA4Mapa = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=GA4%20-%20Mapa&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchInstagramPosts = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Instagram%20-%20Post&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchInstagramFollows = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Instagram%20-%20Follows&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchInstagramMedia = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Instagram%20-%20Media&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchInstagramStory = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Instagram%20-%20Story&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchInstagramVideo = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Instagram%20-%20Video&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchFacebookPosts = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Facebook%20-%20Post&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchFacebookVideoPost = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Facebook%20-%20Video%20Post&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchFacebookFollows = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Facebook%20-%20Follows&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInOrgFollowers = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Follower&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInOrgFollowerRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Follower%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInOrgPosts = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Posts&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInOrgPageSeniority = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Views%20Page%20Seniority&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInOrgPageRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Organico%20Views%20Page%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchTikTokOrganico = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=TikTok%20-%20Organico&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchTikTokTratado = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=TikTok%20-%20Tratado&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchTikTokGenero = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=TikTok%20-%20Genero&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchTikTokRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=TikTok%20-%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchMetaTratado = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Meta%20-%20Tratado&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchMetaGenero = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Meta%20-%20Genero&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchMetaRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Meta%20-%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchConsolidadoGenero = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Consolidado%20-%20Genero&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchConsolidadoRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Consolidado%20-%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGoogleGenero = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Google%20-%20Genero&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGoogleAge = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Google%20-%20Age&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGoogleRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Google%20-%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInTratado = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Tratado&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchLinkedInRegion = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Linkedin%20-%20Region&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchGooglePMaxTratado = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Google%20PMAX%20-%20Tratado&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchOffline = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Offline&range=A1%3AAZ20000`
  )
  return response.data
}

export const fetchProgramatica = async (): Promise<ConsolidadoData> => {
  const response = await consolidadoApi.get(
    `/google/sheets/${SHEET_ID}/data?sheet=Programatica&range=A1%3AAZ20000`
  )
  return response.data
}

export const useOrganicData = () => {
  const [igPosts, setIgPosts] = useState<ConsolidadoData | null>(null)
  const [igFollows, setIgFollows] = useState<ConsolidadoData | null>(null)
  const [igMedia, setIgMedia] = useState<ConsolidadoData | null>(null)
  const [igStory, setIgStory] = useState<ConsolidadoData | null>(null)
  const [igVideo, setIgVideo] = useState<ConsolidadoData | null>(null)
  const [fbPosts, setFbPosts] = useState<ConsolidadoData | null>(null)
  const [fbFollows, setFbFollows] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      const [ip, ifo, im, is_, iv, fp, ff] = await Promise.all([
        fetchInstagramPosts(),
        fetchInstagramFollows(),
        fetchInstagramMedia(),
        fetchInstagramStory(),
        fetchInstagramVideo(),
        fetchFacebookPosts(),
        fetchFacebookFollows(),
      ])
      setIgPosts(ip)
      setIgFollows(ifo)
      setIgMedia(im)
      setIgStory(is_)
      setIgVideo(iv)
      setFbPosts(fp)
      setFbFollows(ff)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { igPosts, igFollows, igMedia, igStory, igVideo, fbPosts, fbFollows, loading, error, refetch: loadData }
}

export const useLinkedInOrganicData = () => {
  const [liFollowers, setLiFollowers] = useState<ConsolidadoData | null>(null)
  const [liFollowerRegion, setLiFollowerRegion] = useState<ConsolidadoData | null>(null)
  const [liPosts, setLiPosts] = useState<ConsolidadoData | null>(null)
  const [liPageSeniority, setLiPageSeniority] = useState<ConsolidadoData | null>(null)
  const [liPageRegion, setLiPageRegion] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      const [f, fr, p, ps, pr] = await Promise.all([
        fetchLinkedInOrgFollowers(),
        fetchLinkedInOrgFollowerRegion(),
        fetchLinkedInOrgPosts(),
        fetchLinkedInOrgPageSeniority(),
        fetchLinkedInOrgPageRegion(),
      ])
      setLiFollowers(f)
      setLiFollowerRegion(fr)
      setLiPosts(p)
      setLiPageSeniority(ps)
      setLiPageRegion(pr)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { liFollowers, liFollowerRegion, liPosts, liPageSeniority, liPageRegion, loading, error, refetch: loadData }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export const parseBrazilianCurrency = (value: string): number => {
  if (!value || value === "0" || value === "-") return 0
  return parseFloat(
    value.replace(/R\$\s?/g, "").replace(/\./g, "").replace(",", ".")
  ) || 0
}

export const parseBrazilianNumber = (value: string): number => {
  if (!value || value === "0" || value === "-") return 0
  return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Campaign {
  name: string
  isActive: boolean
  lastActivity: Date | null
  totalSpent: number
  impressions: number
  clicks: number
  videoViews: number
  engagements: number
  leads: number
  platforms: Set<string>
}

export interface Last7DaysMetrics {
  date: string
  impressions: number
  clicks: number
  videoViews: number
  spent: number
  leads: number
}

// ─── Processing ──────────────────────────────────────────────────────────────

const parseDateStr = (dateStr: string): Date | null => {
  if (!dateStr) return null
  // ISO: "2026-01-16 00:00:00" or "2026-01-16"
  if (dateStr.includes("-")) {
    const d = new Date(dateStr.replace(" ", "T"))
    return isNaN(d.getTime()) ? null : d
  }
  // BR: "dd/mm/yyyy"
  const [day, month, year] = dateStr.split("/")
  if (!day || !month || !year) return null
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export const processCampaigns = (data: ConsolidadoData): Campaign[] => {
  if (!data.success || !data.data.values || data.data.values.length < 2) return []

  const headers = data.data.values[0]
  const rows = data.data.values.slice(1)

  const dateIndex = headers.indexOf("Date")
  const campaignIndex = headers.indexOf("Campanha Nome")
  const spentIndex = headers.indexOf("Total spent")
  const impressionsIndex = headers.indexOf("Impressions")
  const clicksIndex = headers.indexOf("Clicks")
  const videoViewsIndex = headers.indexOf("Video views")
  const engagementsIndex = headers.indexOf("Total engagements")
  const leadsIndex = headers.indexOf("Leads")
  const veiculoIndex = headers.indexOf("Veículo")

  const campaignsMap = new Map<string, Campaign>()

  // Usa o último dia com dados como referência (evita campanhas encerradas aparecerem inativas)
  let lastDataDate: Date | null = null
  rows.forEach((row) => {
    const d = parseDateStr(row[dateIndex])
    if (d && (!lastDataDate || d > lastDataDate)) lastDataDate = d
  })
  const lastDay = lastDataDate ?? new Date()
  lastDay.setHours(0, 0, 0, 0)
  const sevenDaysAgo = new Date(lastDay)
  sevenDaysAgo.setDate(lastDay.getDate() - 6)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  rows.forEach((row) => {
    const campaignName = row[campaignIndex]
    if (!campaignName) return

    const rowDate = parseDateStr(row[dateIndex])

    const spent = parseBrazilianCurrency(row[spentIndex] || "0")
    const impressions = parseBrazilianNumber(row[impressionsIndex] || "0")
    const clicks = parseBrazilianNumber(row[clicksIndex] || "0")
    const videoViews = parseBrazilianNumber(row[videoViewsIndex] || "0")
    const engagements = parseBrazilianNumber(row[engagementsIndex] || "0")
    const leads = parseBrazilianNumber(row[leadsIndex] || "0")
    const veiculo = (row[veiculoIndex] || "").trim()

    if (!campaignsMap.has(campaignName)) {
      campaignsMap.set(campaignName, {
        name: campaignName,
        isActive: false,
        lastActivity: null,
        totalSpent: 0,
        impressions: 0,
        clicks: 0,
        videoViews: 0,
        engagements: 0,
        leads: 0,
        platforms: new Set(),
      })
    }

    const campaign = campaignsMap.get(campaignName)!
    campaign.totalSpent += spent
    campaign.impressions += impressions
    campaign.clicks += clicks
    campaign.videoViews += videoViews
    campaign.engagements += engagements
    campaign.leads += leads
    if (veiculo) campaign.platforms.add(veiculo)

    if (rowDate && rowDate >= sevenDaysAgo && rowDate <= lastDay) {
      if (spent > 0 && impressions > 0) campaign.isActive = true
      if (!campaign.lastActivity || rowDate > campaign.lastActivity) {
        campaign.lastActivity = rowDate
      }
    }
  })

  return Array.from(campaignsMap.values()).sort((a, b) => {
    if (!a.lastActivity && !b.lastActivity) return 0
    if (!a.lastActivity) return 1
    if (!b.lastActivity) return -1
    return b.lastActivity.getTime() - a.lastActivity.getTime()
  })
}

export const getLast7DaysMetrics = (data: ConsolidadoData): Last7DaysMetrics[] => {
  if (!data.success || !data.data.values || data.data.values.length < 2) return []

  const headers = data.data.values[0]
  const rows = data.data.values.slice(1)

  const dateIndex = headers.indexOf("Date")
  const spentIndex = headers.indexOf("Total spent")
  const impressionsIndex = headers.indexOf("Impressions")
  const clicksIndex = headers.indexOf("Clicks")
  const videoViewsIndex = headers.indexOf("Video views")
  const leadsIndex = headers.indexOf("Leads")

  // Encontra o último dia com dados na planilha (não assume "hoje")
  let lastDate: Date | null = null
  rows.forEach((row) => {
    const d = parseDateStr(row[dateIndex])
    if (d && (!lastDate || d > lastDate)) lastDate = d
  })
  const lastDay = lastDate ?? new Date()
  lastDay.setHours(0, 0, 0, 0)

  const sevenDaysAgo = new Date(lastDay)
  sevenDaysAgo.setDate(lastDay.getDate() - 6)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  const metricsMap = new Map<string, Last7DaysMetrics>()

  rows.forEach((row) => {
    const dateStr = row[dateIndex]
    if (!dateStr) return

    const rowDate = parseDateStr(dateStr)
    if (!rowDate) return
    rowDate.setHours(0, 0, 0, 0)
    const dd = String(rowDate.getDate()).padStart(2, "0")
    const mm = String(rowDate.getMonth() + 1).padStart(2, "0")
    const yyyy = rowDate.getFullYear()
    const normalizedDateStr = `${dd}/${mm}/${yyyy}`

    if (rowDate >= sevenDaysAgo && rowDate <= lastDay) {
      if (!metricsMap.has(normalizedDateStr)) {
        metricsMap.set(normalizedDateStr, { date: normalizedDateStr, impressions: 0, clicks: 0, videoViews: 0, spent: 0, leads: 0 })
      }
      const m = metricsMap.get(normalizedDateStr)!
      m.impressions += parseBrazilianNumber(row[impressionsIndex] || "0")
      m.clicks += parseBrazilianNumber(row[clicksIndex] || "0")
      m.videoViews += parseBrazilianNumber(row[videoViewsIndex] || "0")
      m.spent += parseBrazilianCurrency(row[spentIndex] || "0")
      m.leads += parseBrazilianNumber(row[leadsIndex] || "0")
    }
  })

  return Array.from(metricsMap.values()).sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/").map(Number)
    const [dayB, monthB, yearB] = b.date.split("/").map(Number)
    return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime()
  })
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

export const useConsolidadoGeral = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [last7Days, setLast7Days] = useState<Last7DaysMetrics[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await fetchConsolidadoGeral()
      setData(result)
      setCampaigns(processCampaigns(result))
      setLast7Days(getLast7DaysMetrics(result))
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])

  return { data, campaigns, last7Days, loading, error, refetch: loadData }
}

export const useMetaCreatives = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchMetaCreatives())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useLinkedInCreatives = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchLinkedInCreatives())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useGoogleAdsCreatives = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchGooglePMaxCreatives())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useTikTokCreatives = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchTikTokCreatives())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useGA4 = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchGA4())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useGA4Eventos = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchGA4Eventos())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useGA4Mapa = () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetchGA4Mapa())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

const makeSimpleHook = (fetcher: () => Promise<ConsolidadoData>) => () => {
  const [data, setData] = useState<ConsolidadoData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setData(await fetcher())
      setError(null)
    } catch (err) { setError(err as Error) } finally { setLoading(false) }
  }, [])
  React.useEffect(() => { loadData() }, [loadData])
  return { data, loading, error, refetch: loadData }
}

export const useTikTokOrganico = makeSimpleHook(fetchTikTokOrganico)
export const useTikTokTratado = makeSimpleHook(fetchTikTokTratado)
export const useTikTokGenero = makeSimpleHook(fetchTikTokGenero)
export const useTikTokRegion = makeSimpleHook(fetchTikTokRegion)
export const useMetaTratado = makeSimpleHook(fetchMetaTratado)
export const useMetaGenero = makeSimpleHook(fetchMetaGenero)
export const useMetaRegion = makeSimpleHook(fetchMetaRegion)
export const useConsolidadoGenero = makeSimpleHook(fetchConsolidadoGenero)
export const useConsolidadoRegion = makeSimpleHook(fetchConsolidadoRegion)
export const useGoogleGenero = makeSimpleHook(fetchGoogleGenero)
export const useGoogleAge = makeSimpleHook(fetchGoogleAge)
export const useGoogleRegion = makeSimpleHook(fetchGoogleRegion)
export const useLinkedInTratado = makeSimpleHook(fetchLinkedInTratado)
export const useLinkedInRegion = makeSimpleHook(fetchLinkedInRegion)
export const useGooglePMaxTratado = makeSimpleHook(fetchGooglePMaxTratado)
export const useOffline = makeSimpleHook(fetchOffline)
export const useProgramatica = makeSimpleHook(fetchProgramatica)
export const useFacebookVideoPost = makeSimpleHook(fetchFacebookVideoPost)

// Mantido para compatibilidade com componentes que ainda usem usePlanoMidia
export const usePlanoMidia = () => {
  return { data: null as ConsolidadoData | null, loading: false, error: null as Error | null, refetch: async () => {} }
}
