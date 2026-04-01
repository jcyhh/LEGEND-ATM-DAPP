<template>
    <div class="nav flex jb ac">
        <div class="flex ac" @click="routerGo()">
            <van-icon name="arrow-left" :size="20" />
            <div class="size36 bold ml10">足球点球</div>
        </div>
        <div class="flex ac menu">
            <img src="@/assets/coin.png" class="img32 mr10">
            <div class="size24 mr12" v-init="1000"></div>
            <div class="flex ac tag size24">
                <div>购买</div>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
    <div class="content" ref="contentRef">
        <div class="list">
            <img src="@/assets/img/12.png" class="pic12">
            <img src="@/assets/img/13.png" class="pic13">
            <img src="@/assets/img/14.png" class="pic14">
            <div class="container flex col jb">

                <div class="pl30 pr30">
                    <div class="flex jb ac">
                        <div class="tag flex ac">
                            <img src="@/assets/img/15.png" class="img24 mr10">
                            <div class="size26">规则</div>
                        </div>
                        <div class="flex ac">
                            <div class="tag flex ac" @click="routerPush('/record')">
                                <div class="size26">点球记录</div>
                            </div>
                            <div class="tag flex ac ml20" @click="routerPush('/award')">
                                <div class="size26">参与奖记录</div>
                            </div>
                        </div>
                    </div>
                    <div class="reocrd mt30">
                        <div class="top flex jb ac">
                            <div class="size28 bold">第10期</div>
                            <div class="size24">当前8/10人</div>
                        </div>
                        <div class="member">
                            <div class="flex col ac" v-for="(item,index) in 10">
                                <img src="@/assets/img/16.png" class="img48">
                                <div class="size18 mt10">nb34***123s</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex jc pt50">
                    <div class="aniBox">
                        <div class="aniItem" :class="{ aniHidden: activeAni !== 'success' }" ref="successAniRef"></div>
                        <div class="aniItem" :class="{ aniHidden: activeAni !== 'fail' }" ref="failAniRef"></div>
                        <div class="standby" :class="{ aniHidden: activeAni !== 'standby' }" ref="standbyAniRef"></div>
                    </div>
                </div>

                <div>
                    <div class="flex jc">
                        <div class="btnbox flex jc ac size36 bold" v-scale @click="handleConfirm">
                            <div class="btnEnable flex jc ac">确认参与</div>
                        </div>
                    </div>
                    <div class="tc size24 opc5 mb30 mt26">10人参与完毕后开始游戏</div>
                    <div class="flex jb ac pl30 pr30">
                        <div class="inp flex jb ac pl30">
                            <div class="size28 bold opc5">支付</div>
                            <div class="flex ac pr24">
                                <div class="size30 bold" v-init="1000"></div>
                                <img src="@/assets/coin.png" class="img40 ml12">
                            </div>
                        </div>
                        <div class="btn flex jc ac" v-scale>
                            <img src="@/assets/img/22.png" class="img50 mr10">
                            <div class="size28">购买保险</div>
                        </div>
                    </div>
                    <div class="flex tabs mt30" ref="tabsRef">
                        <div class="tabGap"></div>
                        <div class="tabItem flex0 flex jc ac" :class="current==index?'tabAct':'tabDef'" v-for="(item,index) in prices" :key="index" @click="onPriceChange(index, $event)">
                            <img src="@/assets/coin.png" class="img40 mr10">
                            <div class="size28 bold">{{ item }}</div>
                        </div>
                        <div class="tabGap1"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <Result ref="resultRef"></Result>
</template>

<script setup lang="ts">
import lottie, { type AnimationItem } from 'lottie-web'
import failData from '@/assets/ani/fail/data.json'
import standbyData from '@/assets/ani/standby/data.json'
import successData from '@/assets/ani/success/data.json'
import { routerGo, routerPush } from '@/router';
import { onMounted, onUnmounted, ref } from 'vue';
import Result from './ball/Result.vue';

const contentRef = ref<HTMLElement>()
const successAniRef = ref<HTMLElement>()
const failAniRef = ref<HTMLElement>()
const standbyAniRef = ref<HTMLElement>()
const resultRef = ref<InstanceType<typeof Result>>()
const activeAni = ref<'success' | 'fail' | 'standby'>('standby')
const current = ref(0)
const prices = [100, 1000, 3000, 6000, 10000]
const tabsRef = ref<HTMLElement>()
let successAni: AnimationItem | null = null
let failAni: AnimationItem | null = null
let standbyAni: AnimationItem | null = null
let isPlayingSuccess = false

const handleSuccessComplete = () => {
    isPlayingSuccess = false
    resultRef.value?.open()
}

onMounted(() => {
    if (successAniRef.value) {
        successAni = lottie.loadAnimation({
            container: successAniRef.value,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: successData
        })
        successAni.addEventListener('complete', handleSuccessComplete)
    }
    if (failAniRef.value) {
        failAni = lottie.loadAnimation({
            container: failAniRef.value,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: failData
        })
    }
    if (standbyAniRef.value) {
        standbyAni = lottie.loadAnimation({
            container: standbyAniRef.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: standbyData
        })
    }

    setTimeout(() => {
        contentRef.value?.scrollTo({ top: contentRef.value.scrollHeight, behavior: 'smooth' })
    }, 1000)
})

onUnmounted(() => {
    successAni?.removeEventListener('complete', handleSuccessComplete)
    successAni?.destroy()
    failAni?.destroy()
    standbyAni?.destroy()
})

const handleConfirm = () => {
    if (!successAni || isPlayingSuccess) return

    isPlayingSuccess = true
    activeAni.value = 'success'
    standbyAni?.stop()
    failAni?.stop()
    successAni.goToAndPlay(0, true)
}

const onPriceChange = (index: number, e: Event) => {
    if (index === current.value) return
    const el = e.currentTarget as HTMLElement
    const container = tabsRef.value!
    const scrollLeft = index > current.value
        ? el.offsetLeft - container.offsetLeft
        : el.offsetLeft - container.offsetLeft - container.clientWidth + el.offsetWidth
    current.value = index
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
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
    .tag{
        background-color: #FFFFFF4D;
        height: 48px;
        border-radius: 24px;
        padding: 0 10px 0 16px;
    }
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
            padding: 100px 0 40px 0;
            height: 1624px;
            .tag{
                background-color: #00000033;
                border: 1px solid #FFFFFF66;
                padding: 0 16px;
                height: 56px;
                border-radius: 20px;
            }
            .reocrd{
                background-color: #0000004D;
                border: 2px solid #FFFFFF33;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 20px;
                position: relative;
                padding-top: 60px;
                .top{
                    background-color: #464EDD;
                    height: 62px;
                    border: 2px solid #FFFFFF33;
                    border-radius: 20px 20px 0 0;
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -4px;
                    z-index: 1;
                    padding: 0 30px 0 22px;
                }
                .member{
                    display: grid;
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                    gap: 20px;
                    padding: 30px 20px;
                }
            }
            .aniBox{
                width: 560px;
                height: 560px;
                position: relative;
            }
            .aniItem{
                width: 560px;
                height: 560px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .standby{
                width: 172px;
                height: 172px;
                position: absolute;
                bottom: 0;
                left: 200px;
            }
            .aniHidden{
                opacity: 0;
                pointer-events: none;
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
                    width: 200px;
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