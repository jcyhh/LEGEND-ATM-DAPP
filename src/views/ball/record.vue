<template>
    <div class="page">
        <img src="@/assets/img/30.png" class="bg">
        <div class="mask"></div>
    </div>
    <div class="nav flex ac">
        <div class="flex1" @click="routerGo()">
            <van-icon name="arrow-left" :size="20" />
        </div>
        <div class="flex2 tc size36 bold">{{ $t('点球记录') }}</div>
        <div class="flex1"></div>
    </div>
    <div class="gap100"></div>
    
    <van-pull-refresh class="fullPage rel" v-bind="props">
        <van-list class="fullPage rel" v-bind="listProps">
            <div class="pl30 pr30 pt30">

                <div class="card mb20" v-for="(item, index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="flex ac">
                            <div class="size28 bold mr20">NO.{{ item.period }}</div>
                            <div class="size24 opc5">{{ item.end_time }}</div>
                        </div>
                        <div class="size24 success" v-if="item.result==1">{{ $t('挑战成功') }}</div>
                        <div class="size24 fail" v-else>{{ $t('挑战失败') }}</div>
                    </div>
                    <div class="flex ac mt50">
                        <div class="flex1">
                            <span class="size24 opc5 mr10">{{ $t('投入钻石') }}</span>
                            <span class="size28 bold" v-init="item.invested"></span>
                        </div>
                        <div class="flex1">
                            <span class="size24 opc5 mr10">{{ $t('获得钻石') }}</span>
                            <span class="size28 bold" v-init="item.received"></span>
                        </div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </div>
        </van-list>
    </van-pull-refresh>

</template>

<script setup lang="ts">
import { routerGo } from '@/router';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'

const { list, props: listProps, loadList } = useLoadList('/api/football/records', 'records')
const { props } = usePullRefresh(loadList)
loadList()
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

.card {
    width: 690px;
    height: 190px;
    background-image: url("@/assets/img/31.png");
    background-size: 100% 100%;
    padding: 28px 38px 0 38px;

    .success {
        color: #FFEE00;
        font-weight: 600;
    }

    .fail {
        color: #FF4623;
        font-weight: 600;
    }
}
</style>