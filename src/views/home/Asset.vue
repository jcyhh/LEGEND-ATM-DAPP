<template>
    <el-statistic class="size32 bold" :value="outputValue" :precision="6" />
</template>

<script setup lang="ts">
import { useStaking } from '@/dapp/contract/staking';
import { useDappStore } from '@/dapp/store';
import { storeToRefs } from 'pinia';
import { formatEther } from 'viem';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import bus from '@/bus'
import { useTransition } from '@vueuse/core'
import { ElStatistic } from 'element-plus'

const dappStore = useDappStore()
const { walletAddress } = storeToRefs(dappStore)

const { readBalanceOf } = useStaking()

const balance = ref(0)
const outputValue = useTransition(balance, {
    duration: 1000,
})

const loadData = async () => {
    const balanceOf = await readBalanceOf()
    balance.value = Number(formatEther(balanceOf))
}

let timer:any = null
const setTimer = async () => timer = setInterval(() => loadData(), 5000);

watch(walletAddress, val => {
    if(!val)return
    loadData()
    setTimer()
}, { immediate: true})

const onsuccess = () => {
    loadData()
    setTimer()
}

onMounted(()=>{
    bus.on('orderSuccess', onsuccess)
})

onUnmounted(()=>{
    bus.off('orderSuccess', onsuccess)
    if(timer){
        clearInterval(timer)
        timer = null
    }
})
</script>

<style lang="scss" scoped>

</style>