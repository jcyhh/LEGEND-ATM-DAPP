<template>
    <Bg></Bg>
    <div class="pl30 pr30 pt40 rel">
        
        <div class="card">
            <div class="flex jb ac">
                <div class="size24">增加额度</div>
                <div class="size24 opc5">
                    <span>每日限额</span>
                    <span class="ml10" v-init="10"></span>
                    <span>/</span>
                    <span v-init="10"></span>
                    <span class="ml10">Token</span>
                </div>
            </div>
            <div class="inp mt24 flex jb ac">
                <input type="number" placeholder="请输入增加额度" class="flex1 size28">
                <div class="size28 bold6">Token</div>
            </div>
            <div class="mainBtn btn">增加</div>
            <div class="flex jb mt48">
                <div>
                    <div class="size24 mb20">权重(Token)</div>
                    <div class="size48 bold yellow" v-init="1000"></div>
                    <div class="size28 mt20">
                        <span class="opc5 mr10">累计权益</span>
                        <span class="greenish" v-init="1000"></span>
                    </div>
                </div>
                <div class="claim flex ac jc">领取</div>
            </div>
            <div class="award mt40 flex jb ac">
                <div class="size28 opc5">奖励(XO)</div>
                <div class="flex ac size28">
                    <span class="bold6" v-init="1000"></span>
                    <span class="ml10 greenish">领取</span>
                </div>
            </div>
            <div class="flex jb ac mt32">
                <div class="size28 opc5">贡献值</div>
                <div class="size28" v-init="1000"></div>
            </div>
        </div>

        <div class="size30 mt40">记录明细</div>

        <div class="list mt30">
            <div class="cell" v-for="(_item,index) in 10" :key="index">
                <div class="flex jb ac size28">
                    <div>备注</div>
                    <div class="bold6 greenish">
                        <span v-init="1000"></span>
                        <span class="ml10">Token</span>
                    </div>
                </div>
                <div class="size24 opc5 mt10">2026</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Bg from '@/components/Bg.vue';
</script>

<style lang="scss" scoped>
.card{
    padding: 40px 30px;
    border-radius: 20px;
    background-color: #0B3F73;
    border: 2px solid #FFFFFF33;
    .inp{
        background-color: #FFFFFF14;
        border: 1px solid #FFFFFF33;
        height: 88px;
        border-radius: 20px;
        padding: 0 30px;
    }
    .btn{
        height: 80px;
        border-radius: 40px;
        margin-top: 40px;
    }
    .claim{
        height: 64px;
        border-radius: 32px;
        border: 1px solid #1989F5;
        background-color: #1989F51A;
        color: #1989F5;
        min-width: 132px;
    }
    .award{
        height: 88px;
        border-radius: 20px;
        padding: 0 30px;
        background-color: #1385FF33;
    }
}
.list{
    background-color: #152535;
    border: 1px solid #333333;
    border-radius: 20px;
    padding: 0 28px;
    .cell{
        padding: 30px 0;
        border-bottom: 1px solid #FFFFFF1A;
    }
}
</style>