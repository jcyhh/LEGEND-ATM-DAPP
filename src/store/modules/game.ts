import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createSocket } from '@/utils/socket'
import { getToken } from '@/dapp/config'

export const useGameStore = defineStore('game', () => {
    const gameInfo = ref<any>(null)
    const currentUserId = ref<number | null>(null)
    const currentType = ref<1 | 2 | 3>(2)
    let gameSocket: ReturnType<typeof createSocket<any>> | null = null

    const resolveTypeGameInfo = (source: any) => {
        if (!source || typeof source !== 'object') return null

        const typeKey = String(currentType.value)
        if (source[typeKey] && typeof source[typeKey] === 'object') return source[typeKey]
        if (source[currentType.value] && typeof source[currentType.value] === 'object') return source[currentType.value]

        return source
    }

    const normalizeGameInfo = (payload: any) => {
        if (!payload || typeof payload !== 'object') return null

        const data =
            resolveTypeGameInfo(payload.football) ??
            resolveTypeGameInfo(payload.data?.football) ??
            resolveTypeGameInfo(payload.data) ??
            resolveTypeGameInfo(payload.result) ??
            resolveTypeGameInfo(payload.payload)

        if (!data || typeof data !== 'object') return null

        const gameId = data.id ?? data.game_id
        if (
            gameId === undefined ||
            data.period === undefined ||
            data.status === undefined ||
            !Array.isArray(data.players)
        ) {
            return null
        }

        return {
            ...data,
            id: gameId
        }
    }

    const resolveSocketUrl = () => {
        const envSocketUrl = import.meta.env.VITE_SOCKET_URL?.trim()
        if (envSocketUrl) return envSocketUrl

        return `wss://${window.location.host}/ws`
    }

    const connectSocket = () => {
        const token = getToken()
        gameSocket = createSocket({
            url: `${resolveSocketUrl()}?token=${encodeURIComponent(token)}&type=${currentType.value}`,
            parse: normalizeGameInfo,
            onMessage: (data) => {
                gameInfo.value = data
            }
        })
        gameSocket.connect()
    }

    const startSync = (type: 1 | 2 | 3 = 2) => {
        currentType.value = type
        gameInfo.value = null
        stopSync()
        connectSocket()
    }

    const stopSync = () => {
        gameSocket?.close()
        gameSocket = null
    }

    const setCurrentUserId = (id: number | string | null | undefined) => {
        if (id === null || id === undefined || id === '') {
            currentUserId.value = null
            return
        }

        const value = Number(id)
        currentUserId.value = Number.isNaN(value) ? null : value
    }

    return {
        gameInfo,
        currentUserId,
        setCurrentUserId,
        startSync,
        stopSync
    }
})