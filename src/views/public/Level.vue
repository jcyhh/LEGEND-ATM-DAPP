<template>
    <div class="level flex ac">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-if="level==1">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==2">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==3">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==4">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==5">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==6">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==7">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==8">
        <img src="@/assets/level/v1.png" class="img40 mr10" v-else-if="level==9">
        <div class="size24 font1">V{{ level }}</div>
    </div>
</template>

<script setup lang="ts">
import { useStaking } from '@/dapp/contract/staking';
import { useDappStore } from '@/dapp/store';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { formatEther } from 'viem';
import bus from '@/bus'

const dappStore = useDappStore()
const { walletAddress } = storeToRefs(dappStore)

const { readTeamKpi } = useStaking()

const level = ref(0)

const loadLevel = async () => {

    let kpi = await readTeamKpi()
    // 转成小数字
    kpi = Number(formatEther(kpi))

    if (kpi >= 50000000) {
        level.value = 9
    } else if (kpi >= 30000000) {
        level.value = 8
    } else if (kpi >= 10000000) {
        level.value = 7
    } else if (kpi >= 5000000) {
        level.value = 6
    } else if (kpi >= 1000000) {
        level.value = 5
    } else if (kpi >= 500000) {
        level.value = 4
    } else if (kpi >= 100000) {
        level.value = 3
    } else if (kpi >= 50000) {
        level.value = 2
    } else if (kpi >= 10000) {
        level.value = 1
    } else {
        level.value = 0
    }
}

watch(walletAddress, val=>{
    if(!val)return
    loadLevel()
}, { immediate: true})

onMounted(()=>{
    bus.on('orderSuccess', loadLevel)
})

onUnmounted(()=>{
    bus.off('orderSuccess', loadLevel)
})
</script>

<style lang="scss" scoped>
.level{
    background-color: #FFFFFF1A;
    border: 1px solid #FFFFFF66;
    height: 56px;
    padding: 0 20px;
    border-radius: 28px;
}
</style>