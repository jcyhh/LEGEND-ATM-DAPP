<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask"
        teleport="#app">
        <div class="result">
            <div class="pl30 pr30">
                <div class="flex jb ac">
                    <div class="img32"></div>
                    <div class="title size38 bold">提现</div>
                    <img src="@/assets/img/28.png" class="img32" @click="close">
                </div>
            </div>

            <div class="cell flex jb ac mt50" @click="pickerRef?.open(pickerCurrent)">
                <div class="opc5 size28 bold">提现数量</div>
                <div class="flex ac">
                    <img :src="pickerList[pickerCurrent].icon" class="img40 ml20">
                    <div class="size28 bold ml10 mr10">{{ pickerList[pickerCurrent].name }}</div>
                    <van-icon name="arrow" />
                </div>
            </div>

            <div class="cell flex jb ac mt20">
                <div class="opc5 size28 bold">提现数量</div>
                <input type="number" class="size28 bold flex1 tr" placeholder="0">
                <img src="@/assets/coin.png" class="img40 ml20">
            </div>

            <div class="tc size24 mt20">
                <span class="opc5">当前最多可提现钻石</span>
                <span class="bold ml5" v-init="1000"></span>
            </div>

            <div class="flex jc mt20">
                <div class="btn flex jc ac">确认</div>
            </div>
        </div>
    </van-popup>

    <CusPicker ref="pickerRef" :list="pickerList" :default-index="pickerCurrent" @change="$event=>pickerCurrent=$event">
        <template v-slot="{ item }">{{ item.name }}</template>
    </CusPicker>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CusPicker from '@/components/CusPicker/index.vue';
import zuanshi from '@/assets/coin.png'
import bub from '@/assets/img/bub.png'

const show = ref(false)

const pickerCurrent = ref(0)
const pickerRef = ref()
const pickerList = computed(()=>([
    {name:'钻石', icon: zuanshi, value:''},
    {name:'BUB', icon: bub, value:''}
]))

const open = () => {
    show.value = true
}

const close = () => {
    show.value = false
}

defineExpose({
    open,
    close
})
</script>

<style lang="scss" scoped>
.result {
    width: 630px;
    height: 530px;
    background-image: url("@/assets/img/24.png");
    background-size: 100% 100%;
    padding: 24px 30px 0 30px;

    .title{
        color: #4E661A;
    }
    .msg {
        width: 100%;
        height: 100px;
        background-image: url("@/assets/img/27.png");
        background-size: 100% 100%;
        color: #4E661A;
        font-weight: 600;
        padding: 0 30px;
    }

    .marquee-wrap {
        overflow: hidden;
        padding: 0 10px;
    }

    .marquee-track {
        display: flex;
        white-space: nowrap;
        font-weight: 600;
        animation: marquee 5s linear infinite;
    }

    .marquee-item {
        flex-shrink: 0;
        padding: 0 10px;
    }

    @keyframes marquee {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-50%);
        }
    }

    .cell{
        background-color: #3D8021;
        box-shadow: 
        0px 4px 10px 0px #00000033 inset,
        0px 4px 4px 0px #FFFFFF33,
        0px -4px 4px 0px #00000040 inset;
        width: 100%;
        padding: 30px;
        border-radius: 15px;
    }

    .btn {
        width: 278px;
        height: 88px;
        background-image: url("@/assets/img/20.png");
        background-size: 100% 100%;
        color: #774600;
        font-size: 28px;
        font-weight: bold;
    }
}
</style>
