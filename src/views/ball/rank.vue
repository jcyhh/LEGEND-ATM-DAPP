<template>
    <div class="page">
        <img src="@/assets/img/30.png" class="bg">
        <div class="mask"></div>
    </div>
    <div class="nav flex ac">
        <div class="flex1" @click="routerGo()">
            <van-icon name="arrow-left" :size="20" />
        </div>
        <div class="flex2 tc size36 bold">{{ $t('排行榜') }}</div>
        <div class="flex1"></div>
    </div>
    <div class="gap100"></div>
    
    <div class="pl30 pr30 pt30 rel">

        <div class="reocrd">
            <div class="top flex jb ac size24">
                <div class="flex1">{{ $t('排名') }}</div>
                <div class="flex1">{{ $t('用户') }}</div>
                <div class="flex4 tr">{{ $t('投入') }}</div>
            </div>
            <div class="pl30 pr30">
                <div class="rankitem flex ac" v-for="(item,index) in list" :key="index">
                    <div class="flex1">
                        <img src="@/assets/img/rank1.png" class="img40" v-if="index==0">
                        <img src="@/assets/img/rank2.png" class="img40" v-else-if="index==1">
                        <img src="@/assets/img/rank3.png" class="img40" v-else-if="index==2">
                        <div class="img40 flex jc ac size24 opc5" v-else>{{ index + 1 }}</div>
                    </div>
                    <div class="flex1 size26 bold">{{ item.maddress }}</div>
                    <div class="flex4 flex je ac">
                        <div class="size26 bold" v-init="item.total_amount"></div>
                        <img src="@/assets/coin.png" class="img32 ml5">
                    </div>
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </div>

    </div>
    <div class="gap30"></div>
</template>

<script setup lang="ts">
import { routerGo } from '@/router';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { apiGet } from '@/utils/request';

const { params } = useRoute()

const list = ref<any[]>([])
apiGet('/api/football/leaderboard', {
    type: params?.type
}).then((res:any)=>{
    list.value = res.list
})
</script>

<style lang="scss" scoped>
.page {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;

    .bg {
        width: 100vw;
        height: auto;
    }

    .mask {
        width: 100%;
        height: 100%;
        background-color: #00000080;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
}

.nav {
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

.reocrd{
    background-color: #0000004D;
    border: 2px solid #FFFFFF33;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    position: relative;
    padding-top: 60px;
    .top{
        background-color: #464EDD;
        height: 62px;
        border: 2px solid #FFFFFF33;
        border-radius: 20px 20px 0 0;
        position: absolute;
        top: -2px;
        left: -2px;
        right: -4px;
        z-index: 1;
        padding: 0 30px 0 22px;
    }
    .rankitem{
        height: 100px;
        border-bottom: 1px solid #FFFFFF33;
    }
}
</style>