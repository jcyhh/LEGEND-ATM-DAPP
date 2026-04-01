<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="result">
            <img src="@/assets/img/25.png" class="pic25">
            <img src="@/assets/img/28.png" class="img32 pic32" @click="show=false">
            <div class="content">
                <div class="pl30 pr30">
                    <div class="msg flex jc ac">
                        <div class="size26 br tc">
                            <span>本期投入</span>
                            <span class="size32 bold ml5 mr5">100</span>
                            <span>钻石</span>
                            <span>获得</span>
                            <span class="size32 bold ml5 mr5 red">100</span>
                            <span>钻石</span>
                        </div>
                    </div>
                    <div class="flex jc ac mt40">
                        <img src="@/assets/img/29.png" class="img22 mr6">
                        <img src="@/assets/img/29.png" class="img22 mr6">
                        <img src="@/assets/img/29.png" class="img22 mr24">
                        <div class="size26 bold title">幸运用户</div>
                        <img src="@/assets/img/29.png" class="img22 ml24">
                        <img src="@/assets/img/29.png" class="img22 ml6">
                        <img src="@/assets/img/29.png" class="img22 ml6">
                    </div>
                </div>

                <div class="marquee-wrap mt30">
                    <div class="marquee-track size20">
                        <span class="marquee-item" v-for="i in 10" :key="'a'+i">nb34***123s</span>
                        <span class="marquee-item" v-for="i in 10" :key="'b'+i">nb34***123s</span>
                    </div>
                </div>

                <div class="flex jc mt40">
                    <div class="btn flex jc ac">再来一局</div>
                </div>
                
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { useConfetti } from '@/hooks/useConfetti';
import { ref } from 'vue';

const { showConfetti } = useConfetti()

const show = ref(false)

const open = () => {
    show.value = true
    showConfetti()
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
        .marquee-track{
            display: flex;
            white-space: nowrap;
            font-weight: 600;
            animation: marquee 5s linear infinite;
        }
        .marquee-item{
            flex-shrink: 0;
            padding: 0 10px;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
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
