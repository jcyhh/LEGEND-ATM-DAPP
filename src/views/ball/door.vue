<template>
    <div class="page">
        <img src="@/assets/img/30.png" class="bg">
    </div>
    <div class="nav flex ac">
        <div class="flex1" @click="routerGo()">
            <van-icon name="arrow-left" :size="20" />
        </div>
        <div class="flex2 tc size36 bold">{{ $t('点球大战') }}</div>
        <div class="flex1"></div>
    </div>
    <div class="gap150"></div>
    
    <div class="flex jb pl30 rel">
        <div>
            <div class="size48 bold">{{ $t('选择您的') }}<span class="yellow">{{ $t('荣耀战场') }}</span></div>
            <div class="size24 opc5 lh48 mt20">
                {{ $t('低价场练手，高价场封神') }}<br>
                {{ $t('挑战等级，决定你的身价与胆量') }}
            </div>
            <div class="flex mt30" v-scale @click="routerPush('/rank/0')">
                <div class="flex ac btn">
                    <img src="@/assets/img/43.png" class="img38 mr10">
                    <div class="size24 bold">{{ $t('总排行榜') }}</div>
                    <img src="@/assets/img/44.png" class="img30 ml10">
                </div>
            </div>
        </div>
        <img src="@/assets/img/42.png" class="pic42 animate__animated animate__fadeInTopRight">
    </div>

    <div class="pl30 pr30 mt80 rel">
        <div class="card animate__animated animate__backInLeft" @click="goGame">
            <div class="title flex jc ac size28 bold">1U {{ $t('球场') }}</div>
            <div class="size24 bold tc black">{{ $t('100人玩/100人晋级') }}</div>
            <img src="@/assets/img/46.png" class="pic46 mt20">
        </div>

        <div class="card mt50 animate__animated animate__backInRight delay1" @click="routerPush('/game', { type: 2 })">
            <div class="title flex jc ac size28 bold">10U {{ $t('球场') }}</div>
            <div class="size24 bold tc black">{{ $t('10人玩/1人晋级') }}</div>
            <img src="@/assets/img/46.png" class="pic46 mt20">
        </div>

        <div class="card mt50 animate__animated animate__backInLeft delay2" @click="routerPush('/game', { type: 1 })">
            <div class="title flex jc ac size28 bold">100U {{ $t('球场') }}</div>
            <div class="size24 bold tc black">{{ $t('10人玩/1人晋级') }}</div>
            <img src="@/assets/img/46.png" class="pic46 mt20">
        </div>
    </div>

    <div class="gap30"></div>

</template>

<script setup lang="ts">
import { t } from '@/locale';
import { routerGo, routerPush } from '@/router';
import { message } from '@/utils/message';
import { apiGet } from '@/utils/request';
import { ref } from 'vue';

const lottery_enabled = ref(false)
apiGet('/api/football/config', { type: 3 }).then((res:any)=>{
    lottery_enabled.value = res.lottery_enabled        
})

const goGame = () => {
    if(lottery_enabled.value)return routerPush('/game', { type: 3 })
    else return message(t('暂未开放'))
}
</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;

    .bg {
        width: 100vw;
        height: auto;
    }

    .mask {
        width: 100%;
        height: 100%;
        background-color: #00000080;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
}

.nav {
    height: 100px;
    width: 100vw;
    background-color: rgba($color: #070237, $alpha: 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 0 30px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.pic42{
    width: 274px;
    height: 314px;
}
.btn{
    background: linear-gradient(180deg, #F9FB89 0%, #FFB23F 100%);
    height: 66px;
    border-radius: 33px;
    padding: 0 24px;
    color: #000000;
}
.card{
    background-color: #FFFFFFCC;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 54px 30px 30px 30px;
    position: relative;
    .title{
        width: 550px;
        height: 58px;
        position: absolute;
        top: -20px;
        left: 70px;
        z-index: 1;
        background-image: url("@/assets/img/45.png");
        background-size: 100% 100%;
    }
    .pic46{
        width: 630px;
        height: 130px;
    }
}
.delay1{
    animation-delay: 0.1s;
}
.delay2{
    animation-delay: 0.2s;
}
</style>