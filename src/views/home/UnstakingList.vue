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
            <div class="btn flex jc ac size26" v-if="item.status==2 && item.ft_reward_countdown>0" @click="restakeRef.open(item.index)">{{ $t('点击复投') }}</div>
            <div class="opc6 size26" v-else-if="item.status==2 && item.ft_reward_countdown<=0">{{ $t('已失效') }}</div>
            
            <div class="btn flex jc ac size26" v-if="item.status==3" @click="claimRef.open(item.index)">{{ $t('领取奖励') }}</div>
            <div class="opc6 size26" v-if="item.status==4">{{ $t('已复投') }}</div>
            <div class="opc6 size26" v-if="item.status==5">{{ $t('奖励已领取') }}</div>
        </div>
        <div class="flex jb ac mt30">
            <div class="size24 opc5">{{ $t('参与时间') }} {{ item.created_at }}</div>
            <van-count-down :time="item.ft_reward_countdown * 1000" @finish="success" v-if="item.ft_reward_countdown > 0">
                <template #default="timeData">
                    <span class="red size22">{{ timeData.days }}d</span>
                    <span class="red size22 ml5 mr5">{{ timeData.hours }}h</span>
                    <span class="red size22 mr5">{{ timeData.minutes }}m</span>
                    <span class="red size22">{{ timeData.seconds }}s</span>
                </template>
            </van-count-down>
        </div>
        <div class="line mt30"></div>
        <div class="flex jb ac mt20">
            <div class="size26 opc5">{{ $t('协议份额') }}</div>
            <div class="size26 bold" v-init="item.reward" v-if="item.reward && item.reward > 0"></div>
            <van-loading v-else />
        </div>
        <div class="fastbtn flex jc ac size26 mt30" v-if="item.stakeIndex==2 && item.status==2" @click="fastRestake(item)">{{ $t('一键复投') }}</div>
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
import bus from '@/bus'
import { useDappStore } from '@/dapp/store';
import { parseEther } from 'viem';
import { useErc20 } from '@/dapp/contract/erc20';
import { useStaking } from '@/dapp/contract/staking';

const userStore = useUserStore()
const { orders } = storeToRefs(userStore)

const dappStore = useDappStore()
const { dappLoading } = storeToRefs(dappStore)

const { writeApprove } = useErc20()

const { writeRestake, writeClaim } = useStaking()

const restakeRef = ref()

const claimRef = ref()

const success = () => bus.emit('orderSuccess')

const list = computed(()=>{
    if(orders.value.length===0)return []
    return orders.value.filter((item:any)=>item.status!=1)
})

const fastRestake = async (data:any) => {
    dappLoading.value = true // 加载中

    const amount = parseEther(`${data.amount}`) // 复投金额

    await writeApprove(import.meta.env.VITE_STAKING, amount)

    const stakeIndex = 2 // 复投档位

    console.log('复投', data.index, amount, stakeIndex);
    
    await writeRestake(data.index, amount, stakeIndex) // 复投

    console.log('领奖', data.index);
    
    await writeClaim(data.index) // 领取奖励

    setTimeout(() => bus.emit('orderSuccess'), 1000);
}
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
.fastbtn{
    height: 68px;
    border-radius: 34px;
    padding: 0 20px;
    border: 1px solid #1989F5;
    background-color: #1989F51A;
    color: #1989F5;
}
</style>