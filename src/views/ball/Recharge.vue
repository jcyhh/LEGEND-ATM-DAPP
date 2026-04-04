<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask"
        teleport="#app">
        <div class="result">
            <div class="pl30 pr30">
                <div class="flex jb ac">
                    <div class="img32"></div>
                    <div class="title size38 bold">{{ $t('充值') }}</div>
                    <img src="@/assets/img/28.png" class="img32" @click="close">
                </div>
            </div>

            <div class="cell flex jb ac mt100">
                <div class="opc5 size28 bold">{{ $t('充值数量') }}</div>
                <input type="number" v-model="inputAmount" class="size28 bold flex1 tr" placeholder="0">
                <img src="@/assets/coin.png" class="img40 ml20">
            </div>

            <div class="flex je mt20">
                <div class="flex ac size26" @click="routerPush('/rechargeRecord')">
                    <span class="mr5">{{ $t('充值记录') }}</span>
                    <van-icon name="arrow" />
                </div>
            </div>


            <div class="flex jc mt60">
                <div class="btn flex jc ac" v-scale @click="submit">{{ $t('确认') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { t } from '@/locale';
import { routerPush } from '@/router';
import { message } from '@/utils/message';
import { ref } from 'vue';
const emits = defineEmits(['submit'])

const show = ref(false)

const open = () => {
    inputAmount.value = ''
    show.value = true
}

const close = () => {
    show.value = false
}
const inputAmount = ref()

const submit = () => {
    if(!inputAmount.value)return message(t('请输入充值数量'))
    emits('submit', inputAmount.value)
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
