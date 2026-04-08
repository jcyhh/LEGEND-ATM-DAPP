<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="result">
            <img :src="resultImage" class="pic25">
            <img src="@/assets/img/28.png" class="img32 pic32" @click="show=false">
            <div class="content">
                <div class="pl30 pr30">
                    <div class="msg flex jc ac">
                        <div class="size26 br tc" v-if="isWin">{{ rewardText }}</div>
                        <div class="size26 br tc" v-else>{{ $t('感谢参与，获得参与奖奖励') }}</div>
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
                    <div class="winner-list size20" v-if="marqueePlayers.length">
                        <span class="winner-item" v-for="(item, index) in marqueePlayers" :key="index">{{ item }}</span>
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
import { t } from '@/locale';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

type ResultPlayer = {
    user_id?: number
    maddress?: string
    result?: number
}

const { showConfetti } = useConfetti()
const route = useRoute()

const show = ref(false)
const result = ref<1 | 2>(1)
const players = ref<ResultPlayer[]>([])
const winners = ref<string[]>([])

const parseGameType = (value: unknown): 1 | 2 | 3 => {
    const rawValue = Array.isArray(value) ? value[0] : value
    const type = Number(rawValue)
    if (type === 1 || type === 3) return type
    return 2
}

const currentType = computed(() => parseGameType(route.query.type))
const isWinningResult = (value: number) => {
    if (currentType.value === 3) return value === 1
    return value === 2
}
const isWin = computed(() => isWinningResult(result.value))
const rewardText = computed(() => currentType.value === 3 ? t('恭喜破门！获得1.2倍BUB奖励') : t('恭喜破门！获得1.5倍BUB奖励'))
const resultImage = computed(() => (isWin.value ? winImage : failImage))
const winnerPlayers = computed(() => {
    return players.value.filter(item => isWinningResult(Number(item?.result)))
})
const type3WinnerAddresses = computed(() => {
    if (winners.value.length) return winners.value
    return players.value
        .filter(item => Number(item?.result) === 1)
        .map(item => item.maddress || '--')
        .filter(Boolean)
})
const marqueePlayers = computed(() => {
    if (currentType.value === 3) return type3WinnerAddresses.value
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
    players.value = Array.isArray(data?.players) ? data.players : []
    winners.value = Array.isArray(data?.winners) ? data.winners.filter((item: unknown) => typeof item === 'string' && item) : []
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
        .winner-list{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px 20px;
            font-weight: 600;
            text-align: center;
        }
        .winner-item{
            line-height: 1.4;
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
