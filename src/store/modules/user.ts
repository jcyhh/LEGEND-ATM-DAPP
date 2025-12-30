import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {

    const isBindReferral = ref(false)

    const orders = ref<any[]>([])

    const teamKpi = ref(0)

    return {
        isBindReferral,
        orders,
        teamKpi
    }
})