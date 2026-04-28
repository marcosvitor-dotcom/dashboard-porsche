"use client"

import type React from "react"
import { X, Video } from "lucide-react"

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

interface CreativeModalKwaiProps {
  creative: CreativeData | null
  isOpen: boolean
  onClose: () => void
}

const formatNumber = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toLocaleString("pt-BR")
}

const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const formatPct = (value: number): string => `${value.toFixed(2)}%`

const CreativeModalKwai: React.FC<CreativeModalKwaiProps> = ({ creative, isOpen, onClose }) => {
  if (!isOpen || !creative) return null

  const ctr = creative.impressions > 0 ? (creative.clicks / creative.impressions) * 100 : 0
  const cpm = creative.impressions > 0 ? creative.cost / (creative.impressions / 1000) : 0
  const cpc = creative.clicks > 0 ? creative.cost / creative.clicks : 0
  const vtr = creative.impressions > 0 ? (creative.videoPlaysComplete / creative.impressions) * 100 : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{creative.creativeName || "—"}</h2>
            <p className="text-sm text-gray-600">{creative.campaignName}</p>
            {creative.adSetName && (
              <p className="text-xs text-gray-400 mt-0.5">{creative.adSetName}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Área do Criativo */}
            <div className="space-y-4">
              <div
                className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: "9/16", maxHeight: "500px" }}
              >
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <Video className="w-12 h-12" />
                  <div className="text-center">
                    <div className="text-sm font-medium">Kwai Ads</div>
                    <div className="text-xs mt-1">Sem preview disponível</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Informações do Anúncio</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Criativo:</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{creative.creativeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campanha:</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{creative.campaignName}</span>
                  </div>
                  {creative.adSetName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ad Set:</span>
                      <span className="text-gray-900 text-right max-w-[200px] truncate">{creative.adSetName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Métricas de Performance */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Performance</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(creative.cost)}</div>
                  <div className="text-sm text-gray-600">Investimento</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(creative.impressions)}</div>
                  <div className="text-sm text-gray-600">Impressões</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{formatNumber(creative.clicks)}</div>
                  <div className="text-sm text-gray-600">Cliques</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{formatNumber(creative.totalEngagement)}</div>
                  <div className="text-sm text-gray-600">Engajamentos</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Métricas Detalhadas</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CTR:</span>
                    <span className="font-semibold">{formatPct(ctr)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPC:</span>
                    <span className="font-semibold">{formatCurrency(cpc)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPM:</span>
                    <span className="font-semibold">{formatCurrency(cpm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VTR (completados):</span>
                    <span className="font-semibold">{formatPct(vtr)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Vídeo</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vídeos 3s:</span>
                    <span className="font-semibold">{formatNumber(creative.videoPlays3s)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vídeos 5s:</span>
                    <span className="font-semibold">{formatNumber(creative.videoPlays5s)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ThruPlays:</span>
                    <span className="font-semibold">{formatNumber(creative.thruPlays)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completados:</span>
                    <span className="font-semibold">{formatNumber(creative.videoPlaysComplete)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Engajamento Social</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Likes:</span>
                    <span className="font-semibold">{formatNumber(creative.likes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comentários:</span>
                    <span className="font-semibold">{formatNumber(creative.comments)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compartilhamentos:</span>
                    <span className="font-semibold">{formatNumber(creative.shares)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Novos seguidores:</span>
                    <span className="font-semibold">{formatNumber(creative.newFollowers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visitas ao perfil:</span>
                    <span className="font-semibold">{formatNumber(creative.profileVisits)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Última atualização: {new Date().toLocaleString("pt-BR")}</div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreativeModalKwai
