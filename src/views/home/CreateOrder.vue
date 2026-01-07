<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac">
                <van-icon name="cross" color="#152535" :size="30" />
                <div class="size30 font2">{{ $t('增加资产') }}</div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>
            <div class="flex jb ac mt60">
                <div class="size28 font2">{{ $t('金额') }}</div>
                <div class="flex ac main size26" @click="pickerRef.open(current)">
                    <div class="mr10">{{ times[current].name }} {{ $t('天，复利') }} {{ times[current].rate }}</div>
                    <van-icon name="arrow-down" />
                </div>
            </div>
            <div class="inp flex mt20">
                <input type="number" v-model="inputAmount" :placeholder="`${$t('最小')} ${min} ${$t('最大')} ${max}`" class="flex1 size26">
            </div>
            <div class="mt40" v-if="!isBindReferral">
                <div class="size28 font2">{{ $t('邀请地址') }}</div>
                <div class="inp flex mt20">
                    <input type="text" v-model="refAddress" :placeholder="$t('请输入邀请人地址')" class="flex1 size26">
                </div>
            </div>
            <div class="flex ac mt60 font2 size28">
                <div class="popCancel flex1 mr20" @click="show=false">{{ $t('取消') }}</div>
                <div class="popbtn flex1" @click="submit">{{ $t('确定') }}</div>
            </div>
        </div>
    </van-popup>

    <CusPicker ref="pickerRef" :list="times" :default-index="current" @change="$event=>current=$event">
        <template v-slot="{ item }">
            <div>{{ item.name }} {{ $t('天，复利') }} {{ item.rate }}</div>
        </template>
    </CusPicker>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
// import CusPicker from '@/components/CusPicker/index.vue';
import CusPicker from '@/components/CusPicker/Picker.vue';
import { useStaking } from '@/dapp/contract/staking';
import { formatEther, parseEther } from 'viem';
import { showToast } from 'vant';
import { useErc20 } from '@/dapp/contract/erc20';
import { checkGasBalance } from '@/dapp';
import { computedDiv } from '@/utils';
import { useUniswapV2Router } from '@/dapp/contract/uniswapV2Router';
import { getRef } from '@/dapp/config';
import { useReferral } from '@/dapp/contract/referral';
import bus from '@/bus'
import { t } from '@/locale';

const emits = defineEmits(['success'])

const { readMaxStakeAmount, writeStake, writeStakeWithInviter, readMinStakeAmount } = useStaking()

const { writeApprove } = useErc20()

const { readGetAmountsOut } = useUniswapV2Router()

const { readRootAddress, readIsBindReferrer } = useReferral()

const isBindReferral = ref(true)

const show = ref(false)

const rootAddress = ref('')

const pickerRef = ref()
const current = ref(2)
const times = [
    { name: '1', value: '0', rate: '0.2%' },
    { name: '15', value: '1', rate: '0.6%' },
    { name: '30', value: '2', rate: '1.3%' },
]

const inputAmount = ref()
const refAddress = ref()

const loadRefAddress = async () => {
    isBindReferral.value = await readIsBindReferrer()
    if(isBindReferral.value)return;
    const storageRef = getRef()
    if(storageRef)rootAddress.value = storageRef
    else rootAddress.value = await readRootAddress()
}

/**
 * 最大值，定时器
 */
const max = ref(0)
const min = ref(0)
const loadMax = async () => {
    const maxStakeAmount = await readMaxStakeAmount()
    max.value = Number(formatEther(maxStakeAmount))
    console.log('最大值', max.value);
}
const loadMin = async () => {
    const minStakeAmount = await readMinStakeAmount()
    min.value = Number(formatEther(minStakeAmount))
    console.log('最小值', min.value);
}
let timer:any = null
const setTimer = async () => timer = setInterval(() => {
    loadMax()
    loadMin()
}, 30000);

const open = () => {
    inputAmount.value = ''
    refAddress.value = `${rootAddress.value}`
    show.value = true
    if(timer){
        clearInterval(timer)
        timer = null
    }
    loadMax()
    loadMin()
    setTimer()
}

const getOutMin = async () => {
    const num = parseEther(`${computedDiv(inputAmount.value, 2)}`)
    const outMins = await readGetAmountsOut(num, [import.meta.env.VITE_USDT, import.meta.env.VITE_TOKEN])
    return (outMins[1] as bigint) * 90n / 100n
}

const submit = async () => {
    if(!inputAmount.value)return showToast(t('请输入金额'))
    if(Number(inputAmount.value) < min.value)return showToast(t('不能小于最大值'))
    if(Number(inputAmount.value) > max.value)return showToast(t('不能超过最大值'))
    if(!isBindReferral.value && !refAddress.value)return showToast(t('请输入邀请人地址'))

    await checkGasBalance()
    
    const amount = parseEther(`${inputAmount.value}`)
    await writeApprove(import.meta.env.VITE_STAKING, amount)
    const outMin = await getOutMin()
    const timesId = times[current.value].value

    if(isBindReferral.value) await writeStake(amount, outMin, timesId)
    else await writeStakeWithInviter(amount, outMin, timesId, refAddress.value)

    show.value = false
    emits('success')
    bus.emit('orderSuccess')
}

onMounted(()=>{
    loadRefAddress()
})

onUnmounted(()=>{
    if(timer){
        clearInterval(timer)
        timer = null
    }
})

defineExpose({
    open
})
</script>

<style lang="scss" scoped>

</style>