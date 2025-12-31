<template>
     <div class="card mb24" v-for="(item,index) in list" :key="index">
        <div class="flex jb">
            <div>
                <div class="mb12 size24 opc6">{{ $t('协议结算值') }}</div>
                <div>
                    <span class="size44 mr10" v-init="item.amount"></span>
                    <span class="size30">USDT</span>
                </div>
            </div>
            <div class="btn flex jc ac size26" v-if="item.status==2" @click="restakeRef.open(item.index)">{{ $t('点击复投') }}</div>
            <div class="btn flex jc ac size26" v-else-if="item.status==3" @click="claimRef.open(item.index)">{{ $t('领取奖励') }}</div>
            <div class="opc6 size26" v-else-if="item.status==4">{{ $t('已复投') }}</div>
            <div class="opc6 size26" v-else-if="item.status==5">{{ $t('奖励已领取') }}</div>
        </div>
        <div class="flex jb ac mt30">
            <div class="size24 opc5">{{ $t('参与时间') }} {{ item.created_at }}</div>
        </div>
        <div class="line mt30"></div>
        <div class="flex jb ac mt20">
            <div class="size26 opc5">{{ $t('协议份额') }}</div>
            <div class="size26 bold" v-init="item.reward" v-if="item.reward && item.reward > 0"></div>
            <van-loading v-else />
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
.card{
    background-color: #152535B2;
    border: 1px solid #FFFFFF1A;
    padding: 24px;
    border-radius: 20px;
    .btn{
        height: 48px;
        border-radius: 24px;
        padding: 0 20px;
        border: 1px solid #1989F5;
        background-color: #1989F51A;
        color: #1989F5;
    }
    .line{
        height: 1px;
        background-color: #FFFFFF1A;
    }
}
</style>