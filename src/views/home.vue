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
                    <img src="@/assets/img/atm.png" class="img64 mr10">
                    <div class="size30 font2">{{ $t('参与额度') }}</div>
                </div>
                <Asset></Asset>
            </div>
            <div class="btn size26 font2 flex jc ac mt32 rel" :class="walletAddress?'':'disableBtn'" @click="openpop">{{ $t('进入流动性协同协议') }}</div>
        </div>

        <!-- <div class="hash mt30 flex jb ac">
            <div class="size26 bold">总算力</div>
            <div class="size28 bold">
                <span v-init="1000"></span>
                <span>T</span>
            </div>
        </div> -->

        <div class="desc mt40 mb40">
            <img src="@/assets/img/4.png" class="pic4">
            <div class="mt30 size32">
                <span class="green bold mr5">·</span>
                <span>{{ $t('链上流动性协同协议') }}</span>
            </div>
            <div class="mt20 size28">{{ $t('基于去中心化交易流动性的协议级参与模型') }}</div>
            <div class="blue size24 lh40 mt20">
                {{ $t('本协议运行于链上规则与风险控制机制之上') }}<br>
                {{ $t('通过流动性协同参与方式') }}<br>
                {{ $t('使参与者在遵循协议约束的前提下') }}<br>
                {{ $t('获取生态发展过程中产生的参与回报') }}
            </div>
        </div>

        <List></List>

        <div class="gap100"></div>

        <div class="flex jc">
            <img src="@/assets/img/logo.png" class="botlogo">
        </div>
        <div class="pl30 pr30 tc size20 opc6 mt30">{{ $t('本协议为链上流动性参与机制，不构成任何形式的投资或收益承诺。') }}</div>
        <div class="gap50"></div>
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
.hash{
    background: linear-gradient(to right, #1989F5, #0064C7);
    border-radius: 20px;
    padding: 30px;
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
    background: #152535CC;
    border: 1px solid #FFFFFF1A;
    padding: 30px;
    border-radius: 20px;
    position: relative;
    .pic4{
        width: 100%;
        height: auto;
    }
    .tips{
        width: 500px;
    }
}
.botlogo{
    width: 200px;
    height: auto;
}
</style>