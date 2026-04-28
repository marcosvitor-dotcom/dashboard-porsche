# Dashboard de Campanha Publicitária — Exemplo de Portfólio

> Projeto desenvolvido por **Marcos Vitor** para a **Losning Tech**  
> Este dashboard é um exemplo real de entrega — demonstra nossa abordagem e capacidade técnica em projetos de visualização de dados.

---

## O que é este projeto

Este é um dashboard interativo desenvolvido para análise de campanhas publicitárias. Ele centraliza dados de múltiplos canais de mídia em uma única interface, permitindo que o cliente acompanhe o desempenho da campanha em tempo real, sem precisar acessar cada plataforma separadamente.

O projeto cobre canais como Meta Ads, TikTok, Google Ads, LinkedIn, Pinterest, Kwai, mídia offline e dados orgânicos — tudo consolidado em uma visão única, com exportação em PDF.

---

## Como funciona

A solução é composta por três camadas que se comunicam de forma integrada:

### 1. Banco de Dados em Planilhas (Arquitetura Medalhão)

Os dados são organizados em camadas dentro do Google Sheets, seguindo a arquitetura medalhão:

- **Bronze** — dados brutos exportados diretamente das plataformas de mídia, sem tratamento
- **Prata** — dados limpos, padronizados e validados, prontos para análise
- **Ouro** — dados consolidados e agregados, organizados especificamente para alimentar o dashboard

Essa estrutura garante rastreabilidade (sempre é possível voltar à fonte), facilidade de atualização e separação clara entre o dado bruto e o dado apresentado ao cliente.

### 2. API (Backend)

Uma API intermediária conecta o banco de dados ao dashboard. Ela é responsável por ler as planilhas, retornar os dados no formato correto para cada tela e garantir que o frontend nunca acesse a fonte de dados diretamente.

A API é leve, segura e hospedada em nuvem — funciona como uma camada de proteção e padronização entre os dados e a visualização.

### 3. Dashboard (Frontend)

Interface construída em React com TypeScript. Cada página do dashboard representa uma visão diferente da campanha:

- Visão geral e linha do tempo da campanha
- Tráfego, engajamento e desempenho por canal
- Criativos veiculados por plataforma
- Dados orgânicos (sem investimento em mídia)
- Análise de buscas no Google
- Análise semanal de resultados
- Investimento e mídia offline

O design é responsivo, com gráficos interativos e possibilidade de exportar relatórios em PDF.

---

## Tecnologias utilizadas

| Camada | Tecnologias |
|--------|------------|
| Banco de dados | Google Sheets (arquitetura medalhão) |
| Backend (API) | Node.js, NestJS, Google APIs |
| Frontend | React 19, TypeScript, Tailwind CSS |
| Gráficos | Nivo Charts, D3.js |
| Autenticação | Google OAuth |
| Vercel |

---

## O que este projeto demonstra

- Capacidade de integrar múltiplas fontes de dados em uma única visualização
- Estruturação de dados com arquitetura medalhão (bronze → prata → ouro)
- Desenvolvimento de API própria como camada intermediária segura
- Construção de dashboards interativos com foco em clareza e usabilidade
- Entrega de produto funcional, hospedado e acessível via web

---

## Sobre a Losning Tech

A Losning Tech desenvolve soluções de dados e tecnologia sob medida para agências e empresas que precisam transformar dados em decisões. Este projeto é um exemplo do que entregamos — fale com a gente para entender como podemos adaptar isso para o seu negócio.
