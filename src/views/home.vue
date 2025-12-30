<template>
    <Bg></Bg>

    <img src="@/assets/img/5.png" class="pic5">
    
    <div class="pl30 pr30 rel pt60 content">
        <div class="flex jc">
            <img src="@/assets/img/1.png" class="pic1">
        </div>

        <div class="assetBox mt66">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img src="@/assets/img/atm.png" class="atm mr10">
                    <div class="size30 main font2">{{ $t('当前资产') }}</div>
                </div>
                <Asset></Asset>
            </div>
            <div class="btn size26 font2 flex jc ac mt32 rel" :class="walletAddress?'':'disableBtn'" @click="openpop">{{ $t('增加资产') }}</div>
        </div>

        <div class="desc mt30 mb30">
            <img src="@/assets/img/4.png" class="pic4">
            <div class="size32 font2 rel">{{ $t('WEB做市商投资规划') }}</div>
            <div class="size24 lh40 mt30 rel tips">{{ $t('按照投资...') }}</div>
        </div>

        <List></List>

        <div class="gap100"></div>
    </div>

    <CreateOrder ref="createOrderRef"></CreateOrder>
</template>

<script setup lang="ts">
import { Asset, List, CreateOrder } from './home'
import { useDappStore } from '@/dapp/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Bg from '@/components/Bg.vue';

const dappStore = useDappStore()
const { walletAddress } = storeToRefs(dappStore)

const createOrderRef = ref()

const openpop = () => {
    if(!walletAddress.value)return
    createOrderRef.value?.open()
}
</script>

<style lang="scss" scoped>
.pic5{
    width: 100vw;
    height: 552px;
    position: absolute;
    top: 100px;
    left: 0;
}
.pic1{
    width: 290px;
    height: 290px;
    animation: float3d 5s ease-in-out infinite, glow 3s ease-in-out infinite;
}

@keyframes float3d {
    0%, 100% {
        transform: perspective(600px) rotateX(3deg) rotateY(-5deg) translateY(0px) scale(1);
    }
    50% {
        transform: perspective(600px) rotateX(-3deg) rotateY(5deg) translateY(-15px) scale(1.02);
    }
}

@keyframes glow {
    0%, 100% {
        filter: drop-shadow(0 0 15px rgba(25, 137, 245, 0.6)) 
                drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
    }
    50% {
        filter: drop-shadow(0 0 35px rgba(25, 137, 245, 0.9)) 
                drop-shadow(0 0 60px rgba(80, 214, 252, 0.5))
                drop-shadow(0 30px 40px rgba(0, 0, 0, 0.4));
    }
}
.content{
    position: relative;
    z-index: 5;
}
.assetBox{
    border: 2px solid #FFFFFF33;
    background: linear-gradient(#0B3F73, #152535);
    padding: 40px;
    border-radius: 20px;
    position: relative;
    .atm{
        width: 54px;
        height: 64px;
    }
    .btn{
        height: 72px;
        border-radius: 36px;
        background: linear-gradient(#50D6FC, #1989F5);
        color: #000000;
    }
    .disableBtn{
        background: rgba(255, 266, 255, 0.5);
        color: #EBEBEB;
    }
}
.desc{
    background: #053681;
    padding: 40px 30px;
    border-radius: 20px;
    position: relative;
    .pic4{
        width: 100%;
        height: auto;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .tips{
        width: 500px;
    }
}
</style>