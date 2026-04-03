import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createSocket } from '@/utils/socket'
import { getToken } from '@/dapp/config'

export const useGameStore = defineStore('game', () => {
    const gameInfo = ref<any>(null)
    const currentUserId = ref<number | null>(null)
    let gameSocket: ReturnType<typeof createSocket<any>> | null = null

    const normalizeGameInfo = (payload: any) => {
        if (!payload || typeof payload !== 'object') return null

        const data = payload.football ?? payload.data?.football ?? payload.data ?? payload.result ?? payload.payload
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

    const connectSocket = () => {
        const token = getToken()
        gameSocket = createSocket({
            url: `${import.meta.env.VITE_SOCKET_URL}?token=${encodeURIComponent(token)}`,
            parse: normalizeGameInfo,
            onMessage: (data) => {
                gameInfo.value = data
            }
        })
        gameSocket.connect()
    }

    const startSync = () => {
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