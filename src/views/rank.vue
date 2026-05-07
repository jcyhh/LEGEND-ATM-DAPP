<template>
    <Bg></Bg>
    <img src="@/assets/img/51.png" class="pic51">
    <div class="pl30 pr30 rel pt80">
        
        <div class="size56 bold tc yellow" v-init="1000"></div>
        <div class="size24 bold6 tc mt10">龙湖榜池金额(Token)</div>
        <div class="top mt60">
            <div class="title flex jc ac size26 black bold6">本周龙虎榜倒计时</div>
            <div class="flex jc pt40 pb40">
                <van-count-down :time="86600 * 1000">
                    <template #default="timeData">
                        <div class="flex ac">
                            <div class="count" v-if="timeData.days > 0">{{ padZero(timeData.days) }}</div>
                            <div class="dot" v-if="timeData.days > 0">:</div>
                            <div class="count">{{ padZero(timeData.hours) }}</div>
                            <div class="dot">:</div>
                            <div class="count">{{ padZero(timeData.minutes) }}</div>
                            <div class="dot">:</div>
                            <div class="count">{{ padZero(timeData.seconds) }}</div>
                        </div>
                    </template>
                </van-count-down>
            </div>
        </div>

        <div class="list mt30">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img src="@/assets/img/52.png" class="img32 mr16">
                    <div class="size30 bold title">社区业绩排行榜</div>
                </div>
                <div class="flex ac">
                    <div class="size26">本周排行</div>
                    <img src="@/assets/img/53.png" class="img40 ml10">
                </div>
            </div>
            <div class="scrolllist mt40">
                <div class="cell flex jb ac mb20" :class="{
                    cell1: index==0,
                    cell2: index==1,
                    cell3: index==2,
                    cell4: index>2
                }" v-for="(_item,index) in 10" :key="index">
                    <div class="flex ac">
                        <img src="@/assets/img/57.png" class="img40 mr10" v-if="index==0">
                        <img src="@/assets/img/58.png" class="img40 mr10" v-else-if="index==1">
                        <img src="@/assets/img/59.png" class="img40 mr10" v-else-if="index==2">
                        <div class="img40 mr10 flex jc ac opc5" v-else>{{ index + 1 }}</div>
                        <div class="size24 bold6">昵称</div>
                    </div>
                    <div class="amount size24 bold6">
                        <span v-init="1000"></span>
                        <span class="ml10">Token</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mainCard mt30">
            <div class="flex jb ac">
                <div class="size40 bold6">
                    <span v-init="1000"></span>
                    <span class="ml10">Token</span>
                </div>
                <div class="btn flex jc ac size26">领取</div>
            </div>
            <div class="size24 opc5 mt10">可提取奖励</div>
            <div class="cell flex jb ac mt40">
                <div class="size24 opc5">累计奖励</div>
                <div class="size28 bold6">
                    <span v-init="1000"></span>
                    <span class="ml10">Token</span>
                </div>
            </div>
        </div>

        <div class="gap60"></div>

    </div>
</template>

<script setup lang="ts">
import Bg from '@/components/Bg.vue';
import { padZero } from '@/utils';
</script>

<style lang="scss" scoped>
.pic51{
    width: 100vw;
    height: 334px;
    position: absolute;
    top: 100px;
    left: 0;
}
.top{
    border: 1px solid #FFFFFF33;
    background-color: #FFFFFF1A;
    border-radius: 20px;
    overflow: hidden;
    .title{
        width: 100%;
        height: 76px;
        background: linear-gradient(#50D6FC, #1989F5);
    }
    .count{
        width: 100px;
        height: 100px;
        background-color: #FFFFFF1A;
        border: 1px solid #FFFFFF1A;
        border-radius: 20px;
        font-size: 52px;
        font-weight: 600;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dot{
        font-size: 56px;
        font-weight: 600;
        color: #FFFFFF;
        margin: 0 24px;
    }
}
.list{
    background-color: #FFFFFF1A;
    border: 1px solid #FFFFFF1A;
    border-radius: 20px;
    padding: 40px 20px 0 20px;
    .title{
        display: inline-block;
        background: linear-gradient(310.35deg, #FFC93B 22.36%, #FDEFCB 77.64%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
    }
    .scrolllist{
        width: 100%;
        height: 635px;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }
        .cell{
            height: 100px;
            border-radius: 20px;
            padding: 0 24px;
            background-size: 100% 100%;
        }
        .cell1{
            background-image: url("@/assets/img/54.png");
            .amount{
                color: #FDF058;
            }
        }
        .cell2{
            background-image: url("@/assets/img/55.png");
            .amount{
                color: #FDF058;
            }
        }
        .cell3{
            background-image: url("@/assets/img/56.png");
            .amount{
                color: #FDF058;
            }
        }
        .cell4{
            background-image: url("@/assets/img/60.png");
        }
    }
}
.btn{
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(#50D6FC, #1989F5);
    color: #000000;
    min-width: 112px;
}
</style>