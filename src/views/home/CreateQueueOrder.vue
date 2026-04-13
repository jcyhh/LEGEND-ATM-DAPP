<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="size32 font2 tc">{{ $t('参与数量') }}</div>
            <div class="inp flex mt30">
                <input type="number" v-model="inputAmount" :placeholder="$t('请输入本次参与数量')" class="flex1 size26">
            </div>
            <div class="size24 mt20">
                <span>{{ $t('当前可参与上限') }}</span>
                <span class="ml10 mr10" v-init="maxStakeAmount"></span>
                <span>Token</span>
            </div>
            <div class="inp flex jb ac mt30" @click="pickerRef.open(current)">
                <div class="size28">{{ times[current].name }} {{ $t('天，复利') }} {{ times[current].rate }}</div>
                <van-icon name="arrow" color="#FFFFFF80" />
            </div>
            <div class="size24 mt20" v-if="!isBindReferral">
                <div class="size28 font2">{{ $t('邀请地址') }}</div>
                <div class="inp flex mt20">
                    <input type="text" v-model="refAddress" :placeholder="$t('请输入邀请人地址')" class="flex1 size26">
                </div>
            </div>
            <div class="flex ac mt30 font2 size28">
                <div class="popCancel flex1 mr20" @click="show=false">{{ $t('取消') }}</div>
                <div class="popbtn flex1" @click="submit" v-if="inputAmount && Number(inputAmount) >= minStakeAmount ">{{ $t('确认') }}</div>
                <div class="popCancel flex1" v-else>{{ $t('确认') }}</div>
            </div>
            <div class="size24 grey mt30">{{ $t('本操作为生态协作行为，结算结果基于系统规则与链上数据，不构成任何固定或保证结果。') }}</div>
        </div>
    </van-popup>

    <CusPicker ref="pickerRef" :list="times" :default-index="current" @change="$event=>current=$event">
        <template v-slot="{ item }">
            <div>{{ item.name }} {{ $t('天，复利') }} {{ item.rate }}</div>
        </template>
    </CusPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CusPicker from '@/components/CusPicker/index.vue';
import { formatEther, parseEther } from 'viem';
import { showToast } from 'vant';
import { useErc20 } from '@/dapp/contract/erc20';
import { checkGasBalance } from '@/dapp';
import { getRef } from '@/dapp/config';
import { useReferral } from '@/dapp/contract/referral';
import bus from '@/bus'
import { t } from '@/locale';
import { useQueue } from '@/dapp/contract/queue';
import { useDappStore } from '@/dapp/store';
import { storeToRefs } from 'pinia';
import BigNumber from 'bignumber.js';

const emits = defineEmits(['success'])

const dappStore = useDappStore()
const { dappLoading } = storeToRefs(dappStore)

const { writeApprove } = useErc20()

const { readIsBindReferrer } = useReferral()

const { readMinStakeAmount, readMaxStakeAmount, writeStake, writeStakeWithInviter } = useQueue()

const show = ref(false)

// 单选
const pickerRef = ref()
const current = ref(0)
const times = [
    { name: '30', value: '2', rate: '1.3%' },
    { name: '15', value: '1', rate: '0.6%' },
    { name: '1', value: '0', rate: '0.2%' }
]

// 输入的质押数量
const inputAmount = ref()
// 输入的绑定上级地址
const refAddress = ref()

/**
 * 获取用户是否绑定上级
 */
// 是否绑定上级
const isBindReferral = ref(true)
const loadRefAddress = async () => {
    isBindReferral.value = await readIsBindReferrer()
    // 已绑定
    if(isBindReferral.value)return console.log('用户已绑定上级');
    // 未绑定 - 赋值绑定地址为：邀请地址 || 根地址
    const storageRef = getRef()
    if(storageRef){
        refAddress.value = storageRef
        console.log('有邀请码：', storageRef);
    }else{
        // refAddress.value = await readRootAddress()
        refAddress.value = ''
        console.log('无邀请码取根地址：', refAddress.value);
    }
}

/**
 * 获取最小质押数量
 */
const minStakeAmount = ref(1)
const loadMinBindAmount = async () => {
    const minAmount = await readMinStakeAmount()
    minStakeAmount.value = Number(formatEther(minAmount))
    console.log('最小质押数量：', minStakeAmount.value);
}

/**
 * 最大值
 */
const maxStakeAmount= ref(0)
const loadMaxStakeAmount = async () => {
    const maxAmount = await readMaxStakeAmount()
    maxStakeAmount.value = Number(formatEther(maxAmount))
    console.log('最大质押数量：', maxStakeAmount.value);
}

// 打开弹窗
const open = () => {
    // 清除输入
    inputAmount.value = ''
    refAddress.value = ''
    // 打开弹窗
    show.value = true
    loadMaxStakeAmount()
    // 获取最小质押数量
    loadMinBindAmount()
    // 获取用户是否绑定上级
    loadRefAddress()
}

// 下单确认
const submit = async () => {
    if(!inputAmount.value)return showToast(t('请输入金额'))
    // if(Number(inputAmount.value) > maxStakeAmount.value)return showToast(t('不能超过最大值'))
    if(!isBindReferral.value && !refAddress.value)return showToast(t('请输入邀请人地址'))

    if(dappLoading.value)return
    dappLoading.value = true

    // USDT 给 Queue合约 授权
    const amount = parseEther(`${inputAmount.value}`)

    try {
        await checkGasBalance() // 检测Gas
        await writeApprove(import.meta.env.VITE_QUEUE, amount)
    } catch (error) {
        dappLoading.value = false
        return false;
    }

    // 小于最小质押金额时，仅绑定
    if(Number(inputAmount.value) < minStakeAmount.value) {
        
    }else{
        // 质押周期类型
        const stakeIndex = times[current.value].value

        // 如果没有超过最大值，走一遍下单合约即可
        if(inputAmount.value <= maxStakeAmount.value){
            if(isBindReferral.value) await writeStake(amount, stakeIndex) // 质押下单
            else await writeStakeWithInviter(amount, stakeIndex, refAddress.value) // 质押下单 && 绑定上级
        }else{
            // 超过最大值时，按最大值拆解成多次合约
            const arr = splitByA(maxStakeAmount.value, inputAmount.value)
            if(isBindReferral.value){
                // 质押下单
                for(const item of arr){
                    await writeStake(parseEther(`${item}`), stakeIndex)
                }
            }else{
                // 质押下单 && 绑定上级
                for(const item of arr){
                    await writeStakeWithInviter(parseEther(`${item}`), stakeIndex, refAddress.value)
                }
            }
        }

    }

    // 关闭下单弹窗
    show.value = false
    // 触发其他组件下单完成刷新数据
    setTimeout(() => bus.emit('orderSuccess'), 1000);

}

const splitByA = (a:any, b:any) =>  {
    console.log(a, b);
    
    const bnA = new BigNumber(a)
    const total = bnA.plus(b)
    const count = total.dividedToIntegerBy(bnA).toNumber()
    const remainder = total.mod(bnA)

    const result = new Array(count).fill(a)

    if (remainder.gt(0)) {
        result.push(remainder.toNumber())
    }

    return result
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
</style>