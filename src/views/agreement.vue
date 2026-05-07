<template>
    <Bg></Bg>
    <img src="@/assets/img/48.png" class="pic48">
    <div class="gap200"></div>
    <div class="gap200"></div>
    <div class="pl30 pr30 mt20 rel">
        
        <div class="notice flex jb ac">
            <img src="@/assets/img/49.png" class="img40 mr20">
            <van-swipe :show-indicators="false" vertical :autoplay="3000" class="noticeSwi">
                <van-swipe-item v-for="(item,index) in noticeList" :key="index">
                    <div class="noticeSwi size26 line1" @click="routerPush(`/notices/${item.id}`)">{{ item.title }}</div>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="card mt32">
            <div class="size32 bold6">存储协同协议</div>
            <div class="size24 opc5 mt16">通过协同参与，实现网络价值与个人收益的同步增长</div>
            <div class="flex jb ac mt52">
                <div class="size26">参与金额</div>
                <div class="flex ac size24">
                    <img src="@/assets/img/50.png" class="img36 mr12">
                    <div class="opc5" v-init="1000"></div>
                    <div class="opc5 ml5">BNB</div>
                    <div class="blue ml12">全部</div>
                </div>
            </div>
            <div class="inp mt24 flex jb ac">
                <input type="number" placeholder="0.00" class="flex1">
                <div class="bold6">BNB</div>
            </div>
            <div class="mainBtn btn mt40">确认</div>
        </div>

        <div class="size30 mt40 bold6 mb30">订单列表</div>
        <div class="box mb16" v-for="(_item,index) in 3" :key="index">
            <div class="flex jb ac">
                <div>
                    <div class="size28">
                        <span v-init="1000"></span>
                        <span class="ml10">BNB</span>
                    </div>
                    <div class="size24 opc5 mt10">参与额度</div>
                </div>
                <div>
                    <div class="rate flex ac tc">
                        <div class="flex1 opc5">0.5%-0.9%</div>
                        <div class="line1"></div>
                        <div class="flex1 opc5">0.5%-0.9%</div>
                        <div class="line1"></div>
                        <div class="flex1 opc5">0.5%-0.9%</div>
                    </div>
                    <div class="progress mt5 flex ac">
                        <div class="line" :style="{width:`${50}%`}"></div>
                        <div class="amount bold6">
                            <span v-init="30"></span>
                            <span>/</span>
                            <span v-init="30"></span>
                            <span class="ml5">BNB</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="linecol mt20 mb24"></div>
            <div class="flex jb ac">
                <div class="size24 opc5">已释放</div>
                <div class="size24">
                    <span v-init="1000"></span>
                    <span class="ml10">BNB</span>
                </div>
            </div>
            <div class="flex jb ac mt20 size24 opc5">
                <div>参与时间</div>
                <div>2026</div>
            </div>
            <div class="linebtn mt30 flex jc ac size26 bold6">
                <span v-init="10"></span>
                <span>XO/加速释放</span>
            </div>
        </div>

    </div>

    <van-popup v-model:show="showNoticePop" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="size28 bold">{{ noticePopInfo.title }}</div>

            <div class="size24 opc6 mt10">{{ noticePopInfo.updated_at }}</div>

            <div class="noticecontent mt30" v-html="noticePopInfo.content"></div>

            <div class="flex ac mt60 font2 size28">
                <div class="popbtn flex1" @click="readNotice">{{ $t('知道了') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import Bg from '@/components/Bg.vue';
import { useNotice } from '@/hooks/useNotice';
import { routerPush } from '@/router';

const { loadNotice, noticeList, loadNoticePop, showNoticePop, readNotice, noticePopInfo } = useNotice()
loadNotice()
loadNoticePop()
</script>

<style lang="scss" scoped>
.pic48{
    width: 100%;
    height: 552px;
    position: absolute;
    top: 100px;
    left: 0;
}
.notice{
    height: 80px;
    border-radius: 20px;
    border: 1px solid #FFFFFF33;
    background-color: #FFFFFF1A;
    backdrop-filter: blur(20px);
    padding: 0 20px;
    .noticeSwi{
        flex: 1;
        height: 60px;
        line-height: 60px;
    }
}
.noticecontent{
    max-height: 60vh;
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
}
.card{
    border: 2px solid #FFFFFF33;
    background: linear-gradient(#0B3F73, #152535);
    padding: 40px 30px;
    border-radius: 20px;
    .inp{
        background-color: #FFFFFF14;
        border: 1px solid #FFFFFF33;
        border-radius: 20px;
        height: 92px;
        padding: 0 30px;
    }
    .btn{
        height: 80px;
        border-radius: 40px;
    }
}
.box{
    background-color: #152535;
    border: 1px solid #FFFFFF1A;
    padding: 30px;
    border-radius: 20px;
    .rate{
        background-color: #FFFFFF1A;
        border: 1px solid #FFFFFF33;
        width: 356px;
        height: 40px;
        border-radius: 20px;
        font-size: 18px;
        .line1{
            width: 1px;
            height: 100%;
            background-color: #FFFFFF33;
        }
    }
    .progress{
        width: 356px;
        background-color: #FFFFFF1A;
        border: 1px solid #FFFFFF33;
        height: 28px;
        border-radius: 14px;
        padding-left: 4px;
        position: relative;
        .line{
            width: 348px;
            height: 20px;
            border-radius: 10px;
            background-color: #E49800;
            transition: all 0.3s;
        }
        .amount{
            position: absolute;
            right: 4px;
            z-index: 1;
            font-size: 18px;
        }
    }
    .linecol{
        width: 100%;
        height: 1px;
        background-color: #FFFFFF1A;
    }
    .linebtn{
        height: 72px;
        border: 1px solid #1989F5;
        background-color: #1989F51A;
        border-radius: 36px;
        color: #1989F5;
    }
}
</style>