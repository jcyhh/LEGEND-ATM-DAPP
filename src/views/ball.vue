<template>
    <div class="nav flex jb ac">
        <div class="flex ac" @click="routerGo()">
            <van-icon name="arrow-left" :size="20" />
            <div class="size36 bold ml10">{{ $t('点球大战') }}</div>
        </div>
        <div class="flex ac">
            <div class="asset size24 flex ac" @click="routerPush('/asset/balance_bub')">
                <img src="@/assets/img/bub.jpeg" class="img32 mr10 avatar">
                <div v-init="balance_bub"></div>
                <van-icon name="arrow" color="#FFFFFF80" />
            </div>
            <div class="asset size24 flex ac ml24" @click="routerPush('/asset/balance_diamond')">
                <img src="@/assets/coin.png" class="img32 mr10">
                <div v-init="balance_diamond"></div>
                <van-icon name="arrow" color="#FFFFFF80" />
            </div>
        </div>
    </div>
    <div class="recordMenu br" @click="routerPush('/record')">
        <div>{{ $t('点球') }}</div>
        <div>{{ $t('记录') }}</div>
    </div>
    <div class="awardMenu br" @click="routerPush('/award')">
        <div>{{ $t('参与奖') }}</div>
        <div>{{ $t('记录') }}</div>
    </div>
    <div class="countdownBox flex jc ac" v-if="showCountdown">
        <div class="countdownText">{{ displayGameTimer }}</div>
    </div>
    <div class="spectatorBox flex col ac jc" v-if="showSpectatorTip">
        <img src="@/assets/img/1.gif" class="spectatorBall">
        <div class="spectatorText mt30">{{ $t('游戏正在进行中') }}</div>
    </div>
    <div class="content" ref="contentRef">
        <div class="list">
            <img src="@/assets/img/12.png" class="pic12">
            <img src="@/assets/img/13.png" class="pic13">
            <img src="@/assets/img/14.png" class="pic14">
            <div class="container flex col jb">

                <div class="pl30 pr30">
                    <Member></Member>
                </div>

                <div class="flex jc pt50">
                    <Ani ref="aniRef" @complete="handleAniComplete" />
                </div>

                <div>
                    <div class="flex jc">
                        <div class="btnbox tc flex jc ac size36 bold" v-if="canJoin" v-scale @click="handleConfirm">
                            <div class="btnEnable flex jc ac">{{ $t('确认参与') }}</div>
                        </div>
                        <div class="btnbox tc flex jc ac size36 bold" v-else>
                            <div class="btnDisable flex jc ac">{{ buttonText }}</div>
                        </div>
                    </div>
                    <div class="tc size24 opc5 mb30 mt26">{{ $t('10人参与完毕后开始游戏') }}</div>
                    <div class="flex jb ac pl30 pr30">
                        <div class="inp flex jb ac pl30">
                            <div class="size28 bold opc5">{{ $t('支付') }}</div>
                            <div class="flex ac pr24">
                                <div class="size30 bold" v-init="check?total_amount:game_amount"></div>
                                <img src="@/assets/coin.png" class="img40 ml12">
                            </div>
                        </div>
                        <div class="btn flex jc ac">
                            <img src="@/assets/img/22.png" class="img50 mr10 animate__animated animate__zoomIn ani5" v-if="check">
                            <img src="@/assets/img/38.png" class="img50 mr10" v-else>
                            <div class="size28">{{ $t('进球1.5倍卡') }}</div>
                        </div>
                    </div>
                    <div class="flex jb tabs mt30 pl30 pr30">
                        <div class="tabDef tabItem flex jc ac" @click="rechargeRef?.open()">
                            <img src="@/assets/img/34.png" class="img40 mr10">
                            <div>{{ $t('充值') }}</div>
                        </div>
                        <div class="tabDef tabItem flex jc ac" @click="withdrawRef?.open()">
                            <img src="@/assets/img/35.png" class="img40 mr10">
                            <div>{{ $t('提现') }}</div>
                        </div>
                        <div class="tabDef tabItem flex jc ac" @click="routerPush('/pool')">
                            <img src="@/assets/img/36.png" class="img40 mr10">
                            <div>{{ $t('池子') }}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <Result ref="resultRef"></Result>

    <Recharge ref="rechargeRef" @submit="submitRecharge"></Recharge>

    <Withdraw ref="withdrawRef" @submit="submitWithdraw"></Withdraw>
</template>

<script setup lang="ts">
import { routerGo, routerPush } from '@/router';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import Ani from './ball/Ani.vue';
import Result from './ball/Result.vue';
import Recharge from './ball/Recharge.vue';
import Withdraw from './ball/Withdraw.vue';
import { apiGet, apiPost } from '@/utils/request';
import { computedAdd } from '@/utils';
import { useGameStore } from '@/store';
import Member from './ball/Member.vue';
import { useGameProject } from '@/dapp/contract/gameProject';
import { checkGasBalance, getSign } from '@/dapp';
import { useErc20 } from '@/dapp/contract/erc20';
import { t } from '@/locale';

const { writeRecharge, writeWithdraw } = useGameProject()

const { writeApprove } = useErc20()

// 充值
const submitRecharge = async (data:any) => {
    await checkGasBalance()

    await writeApprove(import.meta.env.VITE_GAME_PROJECT, data)

    const signInfo = await getSign('Recharge')

    const res:any = await apiPost('/api/recharge', {
        usdt_amount: data,
        ...signInfo
    })

    const { id, usdt_amount, receiver, deadline, signature } = res
    await writeRecharge(id, usdt_amount, receiver, deadline, signature)

    rechargeRef.value?.close()

    setTimeout(() => {
        loadData()
    }, 3000);
}
// 提现
const submitWithdraw = async (data:any) => {
    const { amount, ccy } = data
    await checkGasBalance()

    const signInfo = await getSign('Claim')

    const res:any = await apiPost('/api/withdraw', {
        amount,
        ccy,
        ...signInfo
    })
    const { id, token, sign_amount, expired_at, sign } = res.info
    await writeWithdraw(id, token, sign_amount, expired_at, sign)

    withdrawRef.value?.close()
    setTimeout(() => {
        loadData()
    }, 3000);
}

const contentRef = ref<HTMLElement>()
const aniRef = ref<InstanceType<typeof Ani>>()
const resultRef = ref<InstanceType<typeof Result>>()
const gameStore = useGameStore()
const settledFlowGameId = ref<number | null>(null)
const currentResult = ref<1 | 2 | null>(null)
const joinLoading = ref(false)
const hasJoinedCurrentGame = computed(() => {
    const currentUserId = gameStore.currentUserId
    const players = gameStore.gameInfo?.players

    if (currentUserId === null || !Array.isArray(players)) return false

    return players.some((item: any) => Number(item?.user_id) === currentUserId)
})
const canJoin = computed(() => gameStore.gameInfo?.status === 0 && !hasJoinedCurrentGame.value)
const buttonText = computed(() => {
    if (hasJoinedCurrentGame.value) return t('已参与')
    if (gameStore.gameInfo?.status === 1 || gameStore.gameInfo?.status === 2) return t('等待下一局')
    return t('确认参与')
})

const rechargeRef = ref()
const withdrawRef = ref()

// 余额
const balance_diamond = ref()
const balance_bub = ref()
const loadData = () => {
    apiGet('/api/users/my').then((res:any)=>{
        balance_diamond.value = res.balance_diamond
        balance_bub.value = res.balance_bub
        gameStore.setCurrentUserId(res.id)
    })
}
loadData()

// 游戏配置
const check = ref(true)
const game_amount = ref()
const insurance_amount = ref()
const total_amount = computed(()=>{
    if(game_amount.value && insurance_amount.value)return computedAdd(game_amount.value, insurance_amount.value)
    else return 0
})
const loadGameConfig = () => {
    apiGet('/api/football/config').then((res:any)=>{
        game_amount.value = res.game_amount
        insurance_amount.value = res.insurance_amount
    })
}
loadGameConfig()

const gameId = computed(() => {
    const value = gameStore.gameInfo?.id
    return value === undefined || value === null ? null : Number(value)
})
const gameStatus = computed(() => gameStore.gameInfo?.status ?? null)
const gameTimer = computed(() => gameStore.gameInfo?.timer ?? null)
const showCountdown = computed(() => {
    return hasJoinedCurrentGame.value && gameStatus.value === 1 && gameTimer.value !== null && gameTimer.value !== undefined && gameTimer.value !== ''
})
const showSpectatorTip = computed(() => {
    return !hasJoinedCurrentGame.value && (gameStatus.value === 1 || gameStatus.value === 2)
})
const displayGameTimer = computed(() => {
    const value = Number(gameTimer.value)
    if (Number.isNaN(value)) return gameTimer.value
    return value + 1
})

const playSettlementAni = async (targetGameId: number) => {
    if (settledFlowGameId.value === targetGameId) return

    // Socket 会持续推送，同一局结算流程只执行一次，直到 game id 变化。
    settledFlowGameId.value = targetGameId
    try {
        const res: any = await apiGet('/api/football/result', { game_id: targetGameId })
        if (gameId.value !== targetGameId) return

        const result = Number(res?.result)
        if (result !== 1 && result !== 2) return

        currentResult.value = result
        resultRef.value?.setData(res)

        if (result === 2) aniRef.value?.playSuccess()
        else aniRef.value?.playFail()
    } catch (error) {
        if (gameId.value === targetGameId) {
            settledFlowGameId.value = null
        }
    }
}

const handleAniComplete = () => {
    if (currentResult.value) {
        resultRef.value?.open(currentResult.value)
    }
}

watch(gameId, (newGameId, oldGameId) => {
    if (newGameId !== oldGameId) {
        settledFlowGameId.value = null
        currentResult.value = null
    }
})

watch(
    [gameStatus, gameId, hasJoinedCurrentGame],
    ([status, currentGameId, joined]) => {
        if (!joined || status === 0 || status === 1) {
            currentResult.value = null
            aniRef.value?.showStandby()
            return
        }

        if (status !== 2 || !currentGameId) return

        playSettlementAni(currentGameId)
    },
    { immediate: true }
)

onMounted(() => {
    gameStore.startSync()
    setTimeout(() => {
        contentRef.value?.scrollTo({ top: contentRef.value.scrollHeight, behavior: 'smooth' })
    }, 1000)
})

onUnmounted(() => {
    gameStore.stopSync()
})

const handleConfirm = async () => {
    const currentGameId = gameId.value
    if (!currentGameId || !canJoin.value || joinLoading.value) return

    joinLoading.value = true
    try {
        await apiPost('/api/football/join', {
            game_id: currentGameId,
            buy_insurance: check.value
        })
    } finally {
        joinLoading.value = false
    }
}
</script>

<style lang="scss" scoped>
.recordMenu{
    max-width: 180px;
    background-color: #0000004D;
    border: 1px solid #FFFFFF66;
    border-radius: 20px;
    position: fixed;
    right: 30px;
    bottom: 450px;
    z-index: 10;
    padding: 10px 16px;
}
.awardMenu{
    max-width: 180px;
    background-color: #0000004D;
    border: 1px solid #FFFFFF66;
    border-radius: 20px;
    position: fixed;
    right: 30px;
    bottom: 328px;
    z-index: 10;
    padding: 10px 16px;
}
.countdownBox{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background-color: #00000080;
    border-radius: 20px;
    padding: 10px;
    z-index: 20;
    pointer-events: none;
}
.countdownText{
    font-size: 120px;
    line-height: 1;
    font-weight: 700;
    color: #FFFFFF;
}
.spectatorBox{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 300px;
    background-color: #00000080;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 30px;
    z-index: 20;
    pointer-events: none;
}
.spectatorBall{
    width: 140px;
    height: 140px;
}
.spectatorText{
    font-size: 28px;
    font-weight: 500;
    color: #FFFFFF;
}
.nav{
    height: 100px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px;
}
.menu{
    border: 1px solid #FFFFFF;
    height: 58px;
    border-radius: 29px;
    padding: 0 2px 0 20px;
}

.tag{
    background-color: #00000033;
    border: 1px solid #FFFFFF66;
    height: 56px;
    border-radius: 24px;
    padding: 0 16px;
}
.asset{
    height: 56px;
    border-radius: 28px;
    border: 1px solid #FFFFFF;
    padding: 0 12px;
}

.content{
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    .list{
        width: 100vw;
        height: 1624px;
        position: relative;
        .pic12{
            width: 100vw;
            height: 1132px;
            position: absolute;
            bottom: 40px;
            left: 0;
            z-index: 2;
        }
        .pic13{
            width: 100vw;
            height: 858px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .pic14{
            width: 100vw;
            height: 514;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 3;
        }
        .container{
            position: relative;
            z-index: 5;
            padding: 120px 0 40px 0;
            height: 1624px;
            .tag{
                background-color: #00000033;
                border: 1px solid #FFFFFF66;
                padding: 0 16px;
                height: 56px;
                border-radius: 20px;
            }
            .tabs{
                height: 80px;
                width: 100vw;
                overflow-x: scroll;
                &::-webkit-scrollbar{
                    display: none;
                }
                .tabGap{
                    width: 30px;
                    height: 80px;
                    flex-shrink: 0;
                }
                .tabGap1{
                    width: 18px;
                    height: 80px;
                    flex-shrink: 0;
                }
                .tabItem{
                    width: 220px;
                    height: 80px;
                    background-size: 100% 100%;
                    margin-right: 12px;
                }
                .tabAct{
                    background-image: url("@/assets/img/18.png");
                    color: #774600;
                }
                .tabDef{
                    background-image: url("@/assets/img/19.png");
                    color: #4E661A;
                }
            }
            .inp{
                width: 400px;
                height: 88px;
                background-image: url("@/assets/img/21.png");
                background-size: 100% 100%;
            }
            .btn{
                width: 278px;
                height: 88px;
                background-image: url("@/assets/img/20.png");
                background-size: 100% 100%;
                color: #774600;
                font-weight: 600;
            }
            .btnbox{
                width: 340px;
                height: 110px;
                border-radius: 55px;
                border: 2px solid #FFFFFF;
                .btnEnable{
                    width: 324px;
                    height: 94px;
                    background: linear-gradient(180deg, #FF7976 0%, #FD3333 100%);
                    color: #FFFFFF;
                    border-radius: 47px;
                    border: 4px solid #FFFFFF;
                }
                .btnDisable{
                    width: 324px;
                    height: 94px;
                    background: linear-gradient(180deg, #C1C1C1 0%, #818181 100%);
                    color: #FFFFFF;
                    border-radius: 47px;
                    border: 4px solid #FFFFFF;
                }
            }
        }
    }
}
</style>