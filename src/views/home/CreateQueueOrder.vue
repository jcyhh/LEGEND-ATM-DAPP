<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="size32 font2 tc">{{ $t('参与额度') }}</div>
            <div class="size24 mt50" v-if="!isBindReferral">
                <div class="inp flex">
                    <input type="text" v-model="refAddress" :placeholder="$t('请输入邀请人地址')" class="flex1 size26">
                </div>
            </div>
            <div class="inp flex mt30">
                <input type="number" v-model="inputAmount" :placeholder="`${$t('单笔最低')} ${minStakeAmount} BNB`" class="flex1 size26">
            </div>
            <div class="size24 mt20 tr">
                <span>{{ $t('已参与') }}</span>
                <span class="ml10 mr10 main" v-init="donatedAmount"></span>
                <span>/</span>
                <span class="mr10 ml10 main" v-if="isWhite">∞</span>
                <span class="ml10 mr10 main" v-init="maxStakeAmount" v-else></span>
                <span>BNB</span>
            </div>
            <div class="flex ac mt30 font2 size28">
                <div class="popCancel flex1 mr20" @click="show=false">{{ $t('取消') }}</div>
                <div class="popbtn flex1" @click="submit" v-if="isEnable">{{ $t('存入') }}</div>
                <div class="disablebtn flex1" v-else><span class="opc5">{{ $t('存入') }}</span></div>
            </div>
            <div class="size24 grey mt30">{{ $t('本操作为生态协作行为，结算结果基于系统规则与链上数据，不构成任何固定或保证结果。') }}</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatEther, parseEther } from 'viem';
import { useErc20 } from '@/dapp/contract/erc20';
import { checkGasBalance } from '@/dapp';
import { getRef } from '@/dapp/config';
import { useReferral } from '@/dapp/contract/referral';
import bus from '@/bus'
import { useDonation } from '@/dapp/contract/donation';
import { computedSub } from '@/utils';

const emits = defineEmits(['success'])

const { writeApprove } = useErc20()

const { readIsBindReferrer } = useReferral()

const { readDonatedAmount, readWhitelist, writeDonated, readDonatedMaxAmount, readDonatedMinAmount } = useDonation()

const show = ref(false)

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
 * 已捐赠数量
 */
const donatedAmount = ref(0)
const loadDonatedAmount = async () => {
    const amount = await readDonatedAmount()
    donatedAmount.value = Number(formatEther(amount))
    console.log('已捐赠', donatedAmount.value);
}

/**
 * 是否是白名单
 */
const isWhite = ref(false)
const loadIsWhite = async () => {
    isWhite.value = await readWhitelist()
    console.log('是否白名单', isWhite.value);
}

/**
 * 获取最小质押数量
 */
const minStakeAmount = ref(0)
const loadMinBindAmount = async () => {
    const minAmount = await readDonatedMinAmount()
    minStakeAmount.value = Number(formatEther(minAmount))
    console.log('最小数量：', minStakeAmount.value);
}

/**
 * 最大值
 */
const maxStakeAmount = ref(0)
const loadMaxStakeAmount = async () => {
    const maxAmount = await readDonatedMaxAmount()
    maxStakeAmount.value = Number(formatEther(maxAmount))
    console.log('最大数量：', maxStakeAmount.value);
}

const isEnable = computed(()=>{
    if(!isBindReferral.value && !refAddress.value)return false
    if(!inputAmount.value)return false
    if(isWhite.value){
        return true
    }else{
        // 剩余数量
        const surAmount = computedSub(maxStakeAmount.value, donatedAmount.value)
        if(Number(inputAmount.value) < minStakeAmount.value || Number(inputAmount.value) > surAmount)return false
        else return true
    }
})

// 打开弹窗
const open = () => {
    // 清除输入
    inputAmount.value = ''
    refAddress.value = ''
    // 打开弹窗
    show.value = true
    // 是否白名单
    loadIsWhite()
    // 已捐赠数量
    loadDonatedAmount()
    // 最大数量
    loadMaxStakeAmount()
    // 获取最小数量
    loadMinBindAmount()
    // 获取用户是否绑定上级
    loadRefAddress()
}

// 下单确认
const submit = async () => {

    const amount = parseEther(`${inputAmount.value}`)

    await checkGasBalance() // 检测Gas
    await writeApprove(import.meta.env.VITE_DONATION, amount)

    if(isBindReferral.value)await writeDonated(amount)
    else await writeDonated(amount, refAddress.value)
    
    // 关闭下单弹窗
    show.value = false
    // 触发其他组件下单完成刷新数据
    setTimeout(() => bus.emit('orderSuccess'), 1000);

}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.disablebtn{
    background-color: #213446;
    height: 88px;
    border-radius: 20px;
    color: #FFFFFF;
    text-align: center;
    line-height: 88px;
}
</style>