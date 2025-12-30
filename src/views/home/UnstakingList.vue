<template>
    <div class="pl30 pr30">
        <div class="flex ac td tc size24" v-for="(item,index) in list" :key="index">
            <div class="flex1 opc6 bold">{{ index }}</div>
            <div class="flex2 pr5">
                <div class="size22 br">{{ item.created_at }}</div>
            </div>
            <div class="flex1 yellow bold pr5 br" v-init="item.amount"></div>
            <div class="flex2 bold pr5 br" v-init="item.reward" v-if="item.reward && item.reward > 0"></div>
            <div class="flex2 bold pr5 br" v-else>
                <van-loading />
            </div>
            <div class="flex2 pr5">
                <div class="green click" v-if="item.status==2 || item.status==6" @click="restakeRef.open(item.index)">{{ $t('点击复投') }}</div>
                <div class="green click" v-else-if="item.status==3" @click="claimRef.open(item.index)">{{ $t('领取奖励') }}</div>
                <div class="opc6" v-else-if="item.status==4">{{ $t('已复投') }}</div>
                <div class="opc6" v-else-if="item.status==5">{{ $t('奖励已领取') }}</div>
            </div>
        </div>
    </div>
    <CusEmpty v-if="list.length==0"></CusEmpty>

    <Restake ref="restakeRef"></Restake>

    <Claim ref="claimRef"></Claim>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import Restake from './Restake.vue';
import Claim from './Claim.vue';

const userStore = useUserStore()
const { orders } = storeToRefs(userStore)

const restakeRef = ref()

const claimRef = ref()

const list = computed(()=>{
    if(orders.value.length===0)return []
    return orders.value.filter((item:any)=>item.status!=1)
})
</script>

<style lang="scss" scoped>
.td{
    padding: 30px 0;
    border-bottom: 1px solid #FFFFFF1A;
}
.click{
    text-decoration: underline;
}
</style>