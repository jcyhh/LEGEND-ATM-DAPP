<template>
    <div class="flex ac size28 mb40">
        <div class="flex ac mr20 line1" :class="current==0?'act':'def'" @click="current=0">{{ $t('协议参与记录') }}</div>
        <div class="flex ac line1" :class="current==1?'act':'def'" @click="current=1">{{ $t('结算记录') }}</div>
    </div>
    <InvesmentList v-if="current==0"></InvesmentList>
    <UnstakingList v-else></UnstakingList>
</template>

<script setup lang="ts">
import { useStaking } from '@/dapp/contract/staking';
import InvesmentList from './InvestmentList.vue';
import UnstakingList from './UnstakingList.vue';
import { useDappStore } from '@/dapp/store';
import { useUserStore } from '@/store';
import { apiGet } from '@/utils/request';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import bus from '@/bus'
import { formatEther } from 'viem';

const dappStore = useDappStore()
const { walletAddress } = storeToRefs(dappStore)

const userStore = useUserStore()
const { orders, teamKpi } = storeToRefs(userStore)

const { readRewardOfSlot } = useStaking()

const current = ref(0)

const loadReward = () => orders.value.forEach((item:any) => readRewardOfSlot(item.index).then((res:any)=>item['reward']=formatEther(res)))

const loadData = async () => {
    const res:any = await apiGet('/api/index')
    orders.value = res.orders
    teamKpi.value = res.team_kpi
    loadReward()
}

let timer:any = null
const setTimer = async () => timer = setInterval(() => loadData(), 10000);

watch(walletAddress, val => {
    if(!val)return
    loadData()
    setTimer()
}, { immediate: true})

const onsuccess = () => {
    if(timer){
        clearInterval(timer)
        timer = null
    }
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
.act{
    height: 68px;
    line-height: 68px;
    border-radius: 34px;
    background: linear-gradient(#50D6FC, #1989F5);
    padding: 0 40px;
    color: #000000;
}
.def{
    height: 68px;
    line-height: 68px;
    border-radius: 34px;
    background-color: #213446;
    padding: 0 40px;
}
</style>