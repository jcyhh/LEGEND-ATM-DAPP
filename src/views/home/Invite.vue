<template>
    <div class="size30">{{ $t('推广链接') }}</div>
    <div class="link mt30 flex jb ac">
        <div class="line1 flex1 mr30 size24">{{ inviteUrl || '--' }}</div>
        <img src="@/assets/img/copy.png" class="img32" v-if="isBindReferral" v-copy="inviteUrl">
        <img src="@/assets/img/copy.png" class="img32" v-else>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useDappStore } from '@/dapp/store';
import { useReferral } from '@/dapp/contract/referral';
import bus from '@/bus'

const dappStore = useDappStore()
const { walletAddress } = storeToRefs(dappStore)

const userStore = useUserStore()
const { isBindReferral } = storeToRefs(userStore)

const { readIsBindReferrer } = useReferral()

const inviteUrl = computed(()=>{
    if(!walletAddress.value)return ''
    if(!isBindReferral.value)return ''
    return `${window.origin}/ref/${walletAddress.value}`
})

watch(walletAddress, async val => {
    if(!val)return
    isBindReferral.value = await readIsBindReferrer()
}, { immediate: true})

const onsuccess = async () => isBindReferral.value = await readIsBindReferrer()

onMounted(()=>{
    bus.on('orderSuccess', onsuccess)
})

onUnmounted(()=>{
    bus.off('orderSuccess', onsuccess)
})
</script>

<style lang="scss" scoped>
.link{
    background-color: #213446;
    border: 1px solid #FFFFFF1A;
    height: 80px;
    border-radius: 20px;
    padding: 0 30px;
    color: #8396A7;
}
</style>