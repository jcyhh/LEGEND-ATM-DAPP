<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="result">
            <img :src="resultImage" class="pic25">
            <img src="@/assets/img/28.png" class="img32 pic32" @click="show=false">
            <div class="content">
                <div class="pl30 pr30">
                    <div class="msg flex jc ac">
                        <div class="size26 br tc" v-if="isWin">
                            <span>{{ $t('本期投入') }}</span>
                            <span class="size32 bold ml5 mr5">{{ investedText }}</span>
                            <span>{{ $t('钻石，获得') }}</span>
                            <span class="size32 bold ml5 mr5 red">{{ receivedText }}</span>
                            <span>{{ $t('钻石') }}</span>
                        </div>
                        <div class="size26 br tc" v-else>{{ $t('本局奖励已转入bub补偿池') }}</div>
                    </div>
                    <div class="flex jc ac mt40">
                        <img src="@/assets/img/29.png" class="img22 mr6">
                        <img src="@/assets/img/29.png" class="img22 mr6">
                        <img src="@/assets/img/29.png" class="img22 mr24">
                        <div class="size26 bold title">{{ $t('幸运用户') }}</div>
                        <img src="@/assets/img/29.png" class="img22 ml24">
                        <img src="@/assets/img/29.png" class="img22 ml6">
                        <img src="@/assets/img/29.png" class="img22 ml6">
                    </div>
                </div>

                <div class="marquee-wrap mt30">
                    <div class="marquee-track size20" v-if="marqueePlayers.length">
                        <span class="marquee-item" v-for="(item, index) in marqueePlayers" :key="'a'+index">{{ item }}</span>
                        <span class="marquee-item" v-for="(item, index) in marqueePlayers" :key="'b'+index">{{ item }}</span>
                    </div>
                    <div class="size20 tc opc5" v-else>--</div>
                </div>
                <div class="flex jc mt40">
                    <div class="btn flex jc ac" @click="close()">{{ $t('再来一局') }}</div>
                </div>
                
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { useConfetti } from '@/hooks/useConfetti';
import winImage from '@/assets/img/25.png'
import failImage from '@/assets/img/26.png'
import { initNumber } from '@/utils'
import { computed, ref } from 'vue';

type ResultPlayer = {
    user_id?: number
    maddress?: string
    result?: number
}

const { showConfetti } = useConfetti()

const show = ref(false)
const result = ref<1 | 2>(1)
const invested = ref<string | number>('0')
const received = ref<string | number>('0')
const players = ref<ResultPlayer[]>([])

const isWin = computed(() => result.value === 1)
const resultImage = computed(() => (isWin.value ? winImage : failImage))
const investedText = computed(() => initNumber(Number(invested.value) || 0))
const receivedText = computed(() => initNumber(Number(received.value) || 0))
const winnerPlayers = computed(() => {
    return players.value.filter(item => Number(item?.result) === 1)
})
const marqueePlayers = computed(() => {
    return winnerPlayers.value
        .map(item => item.maddress || '--')
        .filter(Boolean)
})

const open = (value?: number) => {
    if (value === 1 || value === 2) result.value = value
    show.value = true
    if (isWin.value) showConfetti()
}

const close = () => {
    show.value = false
}

const setResult = (value: number) => {
    if (value === 1 || value === 2) result.value = value
}

const setData = (data: any) => {
    invested.value = data?.invested ?? '0'
    received.value = data?.received ?? '0'
    players.value = Array.isArray(data?.players) ? data.players : []
    setResult(Number(data?.result))
}

defineExpose({
    open,
    close,
    setResult,
    setData
})
</script>

<style lang="scss" scoped>
.result{
    width: 630px;
    height: 670px;
    position: relative;
    padding-top: 140px;
    .pic25{
        width: 275px;
        height: 222px;
        position: absolute;
        top: 0;
        left: 178px;
        z-index: 1;
    }
    .pic32{
        position: absolute;
        top: 170px;
        right: 20px;
        z-index: 1;
    }
    .content{
        width: 630px;
        height: 530px;
        background-image: url("@/assets/img/24.png");
        background-size: 100% 100%;
        padding-top: 116px;
        .msg{
            width: 100%;
            height: 100px;
            background-image: url("@/assets/img/27.png");
            background-size: 100% 100%;
            color: #4E661A;
            font-weight: 600;
            padding: 0 30px;
        }
        .title{
            color: #FCFBB0;
            text-shadow: 0px 2px 2px #00000040;
        }
        .marquee-wrap{
            overflow: hidden;
            padding: 0 10px;
        }
        .marquee-track{
            display: flex;
            white-space: nowrap;
            font-weight: 600;
            animation: marquee 5s linear infinite;
        }
        .marquee-item{
            flex-shrink: 0;
            padding: 0 10px;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .btn{
            width: 278px;
            height: 88px;
            background-image: url("@/assets/img/20.png");
            background-size: 100% 100%;
            color: #774600;
            font-size: 28px;
            font-weight: bold;
        }
    }
}
</style>
