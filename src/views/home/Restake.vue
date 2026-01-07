<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac">
                <van-icon name="cross" color="#152535" :size="30" />
                <div class="size30 font2">{{ $t('复投') }}</div>
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
import { computed, onUnmounted, ref } from 'vue';
import { useStaking } from '@/dapp/contract/staking';
import { formatEther, parseEther } from 'viem';
import { showToast } from 'vant';
import { useErc20 } from '@/dapp/contract/erc20';
import { checkGasBalance } from '@/dapp';
import { computedDiv } from '@/utils';
import { useUniswapV2Router } from '@/dapp/contract/uniswapV2Router';
import bus from '@/bus'
import { t } from '@/locale';
import CusPicker from '@/components/CusPicker/index.vue';

const { readMaxStakeAmount, writeRestake, readUserStakeRecord } = useStaking()

const { writeApprove } = useErc20()

const { readGetAmountsOut } = useUniswapV2Router()

const show = ref(false)

const index = ref()

const min = ref(0)
const minCurrent = ref(0)

const pickerRef = ref()
const current = ref(0)
const times = computed(()=>{
    let arr = [
        { name: '1', value: '0', rate: '0.3%' },
        { name: '15', value: '1', rate: '0.6%' },
        { name: '30', value: '2', rate: '1.2%' },
    ]
    if(minCurrent.value==1)arr.splice(0,1)
    if(minCurrent.value==2)arr.splice(0,2)
    return arr
})

const inputAmount = ref()

/**
 * 最大值，定时器
 */
const max = ref(0)
const loadData = async () => {
    const maxStakeAmount = await readMaxStakeAmount()
    max.value = Number(formatEther(maxStakeAmount))
    console.log('最大值', max.value);
}
let timer:any = null
const setTimer = async () => timer = setInterval(() => loadData(), 30000);

const open = (i:number) => {
    index.value = i
    inputAmount.value = ''
    current.value = 0
    show.value = true
    readUserStakeRecord(i).then((res:any)=>{
        console.log(res);
        min.value = Number(formatEther(res[1]))
        // minCurrent.value = res[3]
        minCurrent.value = 2
    })
    if(timer){
        clearInterval(timer)
        timer = null
    }
    loadData()
    setTimer()
}

const getOutMin = async () => {
    const num = parseEther(`${computedDiv(inputAmount.value, 2)}`)
    const outMins = await readGetAmountsOut(num, [import.meta.env.VITE_USDT, import.meta.env.VITE_TOKEN])
    return (outMins[1] as bigint) * 90n / 100n
}

const submit = async () => {
    if(!inputAmount.value)return showToast(t('请输入金额'))
    if(Number(inputAmount.value) < min.value)return showToast(t('不能小于最小值'))
    if(Number(inputAmount.value) > max.value)return showToast(t('不能超过最大值'))

    await checkGasBalance()
    
    const amount = parseEther(`${inputAmount.value}`)
    await writeApprove(import.meta.env.VITE_STAKING, amount)
    const outMin = await getOutMin()
    const timesId = times.value[current.value].value

    await writeRestake(index.value, amount, outMin, timesId)

    show.value = false
    bus.emit('orderSuccess')
}

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