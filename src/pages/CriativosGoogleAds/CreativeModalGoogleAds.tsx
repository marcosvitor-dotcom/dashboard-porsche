"use client"

import type React from "react"
import { X, Search } from "lucide-react"

interface CreativeData {
  date: string
  campaign: string
  adGroup: string
  ad: string
  imageUrl: string
  impressions: number
  clicks: number
  cost: number
  videoViews: number
  videoViews25: number
  videoViews50: number
  videoViews75: number
  videoViews100: number
  engagements: number
  tipoCompra: string
}

interface CreativeModalGoogleAdsProps {
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

const CreativeModalGoogleAds: React.FC<CreativeModalGoogleAdsProps> = ({ creative, isOpen, onClose }) => {
  if (!isOpen || !creative) return null

  const ctr = creative.impressions > 0 ? (creative.clicks / creative.impressions) * 100 : 0
  const vtr = creative.videoViews > 0 ? (creative.videoViews100 / creative.videoViews) * 100 : 0
  const cpm = creative.impressions > 0 ? creative.cost / (creative.impressions / 1000) : 0
  const cpc = creative.clicks > 0 ? creative.cost / creative.clicks : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{creative.ad || "—"}</h2>
            <p className="text-sm text-gray-600">{creative.campaign}</p>
            {creative.adGroup && (
              <p className="text-xs text-gray-400 mt-0.5">{creative.adGroup}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações do Criativo */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: "9/16", maxHeight: "500px" }}>
                {creative.imageUrl ? (
                  <img
                    src={creative.imageUrl}
                    alt="Criativo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="flex flex-col items-center gap-2 text-gray-400 text-sm">Sem imagem</div>'
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Search className="w-12 h-12" />
                    <div className="text-center">
                      <div className="text-sm font-medium">Google Ads</div>
                      <div className="text-xs mt-1">Sem preview disponível</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Informações do Anúncio</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Anúncio:</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{creative.ad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campanha:</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{creative.campaign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grupo de anúncio:</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{creative.adGroup}</span>
                  </div>
                  {creative.tipoCompra && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo de Compra:</span>
                      <span className="px-2 py-0.5 rounded-full text-white text-xs font-semibold bg-blue-500">{creative.tipoCompra}</span>
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
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{formatNumber(creative.videoViews)}</div>
                  <div className="text-sm text-gray-600">Video Views</div>
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
                    <span className="text-gray-600">VTR:</span>
                    <span className="font-semibold">{formatPct(vtr)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engajamentos:</span>
                    <span className="font-semibold">{formatNumber(creative.engagements)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Retenção de Vídeo</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visualizações 25%:</span>
                    <span className="font-semibold">{formatNumber(creative.videoViews25)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visualizações 50%:</span>
                    <span className="font-semibold">{formatNumber(creative.videoViews50)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visualizações 75%:</span>
                    <span className="font-semibold">{formatNumber(creative.videoViews75)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visualizações 100%:</span>
                    <span className="font-semibold">{formatNumber(creative.videoViews100)}</span>
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

export default CreativeModalGoogleAds
