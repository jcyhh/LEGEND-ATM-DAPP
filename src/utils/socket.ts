interface SocketOptions<T> {
    url: string
    parse?: (payload: unknown) => T | null
    onMessage: (data: T) => void
    onOpen?: () => void
    onClose?: () => void
    onError?: (event: Event) => void
    reconnectDelay?: number
    autoReconnect?: boolean
}

export const createSocket = <T>(options: SocketOptions<T>) => {
    let socket: WebSocket | null = null
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null
    let manualClosed = false
    const socketLabel = `[socket] ${options.url}`

    const clearReconnectTimer = () => {
        if (!reconnectTimer) return
        clearTimeout(reconnectTimer)
        reconnectTimer = null
    }

    const close = () => {
        manualClosed = true
        clearReconnectTimer()
        console.log(`${socketLabel} close by manual`)
        if (!socket) return
        socket.onopen = null
        socket.onmessage = null
        socket.onerror = null
        socket.onclose = null
        socket.close()
        socket = null
    }

    const connect = () => {
        manualClosed = false
        clearReconnectTimer()
        if (socket) {
            socket.onopen = null
            socket.onmessage = null
            socket.onerror = null
            socket.onclose = null
            socket.close()
            socket = null
        }
        console.log(`${socketLabel} connecting`)
        socket = new WebSocket(options.url)

        socket.onopen = () => {
            clearReconnectTimer()
            console.log(`${socketLabel} connected`)
            options.onOpen?.()
        }

        socket.onmessage = (event) => {
            let payload: unknown = event.data

            try {
                payload = JSON.parse(event.data)
            } catch {
                payload = event.data
            }

            const data = options.parse ? options.parse(payload) : (payload as T)
            if (data !== null) {
                options.onMessage(data)
            }
        }

        socket.onerror = (event) => {
            console.error(`${socketLabel} error`, event)
            options.onError?.(event)
        }

        socket.onclose = () => {
            console.log(`${socketLabel} closed`, { manualClosed })
            options.onClose?.()
            socket = null

            if (manualClosed || options.autoReconnect === false) return

            const reconnectDelay = options.reconnectDelay ?? 3000
            console.log(`${socketLabel} reconnect in ${reconnectDelay}ms`)
            reconnectTimer = setTimeout(() => {
                reconnectTimer = null
                if (!manualClosed) connect()
            }, reconnectDelay)
        }
    }

    return {
        connect,
        close,
        get instance() {
            return socket
        }
    }
}
