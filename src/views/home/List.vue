<template>
    <div class="list pt30">
        <div class="flex ac pl30 size28">
            <div class="flex ac mr20" :class="current==0?'act':'def'" @click="current=0">{{ $t('投资列表') }}</div>
            <div class="flex ac" :class="current==1?'act':'def'" @click="current=1">{{ $t('赎回列表') }}</div>
        </div>
        <div class="th mt28 flex ac tc size24">
            <div class="flex1">{{ $t('序号') }}</div>
            <div class="flex2 pr5">{{ $t('日期') }}</div>
            <div class="flex1 pr5">{{ $t('本金') }}</div>
            <div class="flex2 pr5">{{ $t('盈利') }}</div>
            <div class="flex2 pr5">{{ $t('赎回进展') }}</div>
        </div>
        <InvesmentList v-if="current==0"></InvesmentList>
        <UnstakingList v-else></UnstakingList>
    </div>
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
.list{
    background-color: #152535;
    border-radius: 20px;
    min-height: 500px;
    .act{
        height: 68px;
        border-radius: 34px;
        background: linear-gradient(#50D6FC, #1989F5);
        padding: 0 40px;
        color: #000000;
    }
    .def{
        height: 68px;
        border-radius: 34px;
        background-color: #213446;
        padding: 0 40px;
    }
    .th{
        height: 88px;
        background-color: #213446;
        padding: 0 30px;
        color: #A2A6B4;
    }
    .td{
        padding: 30px 0;
        border-bottom: 1px solid #FFFFFF1A;
    }
    .click{
        text-decoration: underline;
    }
}
</style>