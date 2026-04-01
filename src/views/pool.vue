<template>
    <Bg></Bg>
    <img src="@/assets/img/11.png" class="pic11">
    <div class="pl30 pr30 pt30 content">
        
        <div class="size48 tc bold">
            <span class="yellow">LEGEND ATM</span>
            <span class="ml10">池子</span>
        </div>

        <div class="tc size24 opc5 mt10">链上归集、销毁，安全上链，全程可查</div>

        <div class="gap200"></div>
        <div class="gap200"></div>
        <div class="gap50"></div>

        <div class="top">
            <div class="flex ac">
                <img src="@/assets/img/coin.png" class="img60 mr10">
                <div class="size32 bold">添加ATM池</div>
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
                <img src="@/assets/img/coin.png" class="img60 mr10">
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
import Bg from '@/components/Bg.vue';
</script>

<style lang="scss" scoped>
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
    background-color: #152535;
    border: 1px solid #FFFFFF1A;
    border-radius: 20px;
    padding: 40px 40px 40px 30px;
}
</style>