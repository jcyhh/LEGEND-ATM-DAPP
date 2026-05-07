<template>
    <div class="flex ac size28 mb40 tabs">
        <div class="flex ac mr20 flex0" :class="current==0?'act':'def'" @click="current=0">{{ $t('排队中') }}</div>
        <div class="flex ac mr20 flex0" :class="current==1?'act':'def'" @click="current=1">{{ $t('列队记录') }}</div>
        <div class="flex ac mr20 flex0" :class="current==2?'act':'def'" @click="current=2">{{ $t('协议参与记录') }}</div>
        <div class="flex ac flex0" :class="current==3?'act':'def'" @click="current=3">{{ $t('结算记录') }}</div>
    </div>
    <Queue v-if="current==0"></Queue>
    <Donation v-else-if="current==1"></Donation>
    <InvesmentList v-else-if="current==2"></InvesmentList>
    <UnstakingList v-else></UnstakingList>
</template>

<script setup lang="ts">
import { useStaking } from '@/dapp/contract/staking';
import InvesmentList from './InvestmentList.vue';
import UnstakingList from './UnstakingList.vue';
import Queue from './Queue.vue';
import Donation from './Donation.vue';
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

const { readRewardOfSlot, readUserStakeRecord } = useStaking()

const current = ref(0)

const loadReward = () => {
    orders.value.forEach((item:any) => {
        // 查奖励
        readRewardOfSlot(item.index).then((res:any)=>{
            item['reward']=formatEther(res)
        })
        // 复投列表需要的数据
        if(item.status!=1){
            // 复投数据差质押时选择的周期
            readUserStakeRecord(item.index).then((res:any)=>{
                item['stakeIndex'] = res[2]
            })
        }
    })
}

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
.tabs{
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
}
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