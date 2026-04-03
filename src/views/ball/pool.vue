<template>
    <div class="page">
        <img src="@/assets/img/30.png" class="bg">
        <div class="mask"></div>
    </div>
    <div class="nav flex ac">
        <div class="flex1" @click="routerGo()">
            <van-icon name="arrow-left" :size="20" />
        </div>
        <div class="flex2 tc size36 bold">池子</div>
        <div class="flex1"></div>
    </div>
    <div class="gap200"></div>
    <img src="@/assets/img/37.png" class="pic37">
    <div class="pl30 pr30 pt30 rel">
        
        <div class="size48 tc bold">
            <span class="yellow">LEGEND ATM</span>
            <span class="ml10">池子</span>
        </div>

        <div class="tc size24 opc5 mt10">链上归集、销毁，安全上链，全程可查</div>

        <div class="gap200"></div>
        <div class="gap76"></div>

        <div class="card">
            <div class="flex ac">
                <img src="@/assets/img/coin.png" class="img60 mr10">
                <div class="size32 bold">添加ATM池</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size28 opc5">池子总额</div>
                <div class="size40 bold">
                    <span v-init="1000"></span>
                    <span class="ml10">ATM</span>
                </div>
            </div>
        </div>

        <div class="card mt30">
            <div class="flex ac">
                <img src="@/assets/img/coin.png" class="img60 mr10">
                <div class="size32 bold">ATM销毁池</div>
            </div>
            <div class="flex jb ac mt40">
                <div class="size28 opc5">池子总额</div>
                <div class="size40 bold">
                    <span v-init="1000"></span>
                    <span class="ml10">ATM</span>
                </div>
            </div>
        </div>

        <div class="card mt30">
            <div class="flex ac">
                <img src="@/assets/img/bub.png" class="img60 mr10">
                <div class="size32 bold">BUB销毁池</div>
            </div>
            <div class="flex jb ac mt40">
                <div class="size28 opc5">池子总额</div>
                <div class="size40 bold">
                    <span v-init="1000"></span>
                    <span class="ml10">BUB</span>
                </div>
            </div>
        </div>

    </div>

    <div class="gap30"></div>
</template>

<script setup lang="ts">
import { routerGo } from '@/router';
</script>

<style lang="scss" scoped>
.page{
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    .bg{
        width: 100vw;
        height: auto;
    }
    .mask{
        width: 100%;
        height: 100%;
        background-color: #00000080;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
}
.pic37{
    width: 590px;
    height: 236px;
    position: absolute;
    top: 362px;
    left: 80px;
}
.nav{
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
.content{
    position: relative;
    z-index: 5;
}
.pic11{
    width: 100vw;
    height: 612px;
    position: absolute;
    top: 252px;
    left: 0;
    z-index: 1;
}
.top{
    background: linear-gradient(270deg, #0064C7 0%, #1989F5 100%);
    border-radius: 20px;
    padding: 40px 40px 40px 30px;
}
.card{
    width: 690px;
    height: 190px;
    background-image: url("@/assets/img/31.png");
    background-size: 100% 100%;
    padding: 20px 38px 0 38px;
}
</style>