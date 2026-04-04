<template>
    <div class="page">
        <img src="@/assets/img/30.png" class="bg">
        <div class="mask"></div>
    </div>
    <div class="head">
        <div class="nav flex ac">
            <div class="flex1" @click="routerGo()">
                <van-icon name="arrow-left" :size="20" />
            </div>
            <div class="flex2 tc size36 bold">{{ $t('参与奖记录') }}</div>
            <div class="flex1"></div>
        </div>
        <div class="tabs flex jb ac">
            <div class="tabItem flex jc ac size28 bold" :class="current == index ? 'tabAct' : 'tabDef'"
                v-for="(item, index) in tabs" :key="index" @click="onTabClick(index)">{{ item.name }}</div>
        </div>
    </div>

    <div class="gap200"></div>
    <van-pull-refresh class="pagelog rel" v-bind="props">
        <van-list class="pagelog rel" v-bind="listProps">
            <div class="pl30 pr30 pt30 rel">

                <div class="card mb20" v-for="(item, index) in list" :key="index">
                    <div class="flex jb">
                        <div class="">
                            <div class="size24 mb16">{{ $t('有效本金') }}</div>
                            <div class="flex ac">
                                <img src="@/assets/coin.png" class="img40 mr10">
                                <div class="size40 bold yellow" v-init="item.amount"></div>
                            </div>
                        </div>
                        <div class="pt10">
                            <div class="progress">
                                <div class="progressLine" :style="{ width: `${getPercent(item.release_u_amount, item.out_amount)}%` }"></div>
                            </div>
                            <div class="tr size20 opc5 mt10">{{ getPercent(item.release_u_amount, item.out_amount) }}%</div>
                        </div>
                    </div>
                    <div class="flex jb ac mt44">
                        <div class="size24 opc5">{{ $t('总释放') }}</div>
                        <div class="flex ac">
                            <div class="size24 bold yellow" v-init="item.out_amount"></div>
                            <img src="@/assets/coin.png" class="img24 ml5">
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc5">{{ $t('已释放') }}</div>
                        <div class="flex ac">
                            <div class="size24 bold" v-init="item.release_u_amount"></div>
                            <img src="@/assets/coin.png" class="img24 ml5">
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc5">{{ $t('已释放') }}(BUB)</div>
                        <div class="flex ac">
                            <div class="size24 bold" v-init="item.released_amount"></div>
                            <img src="@/assets/img/bub.jpeg" class="img24 ml5 avatar">
                        </div>
                    </div>
                </div>

            </div>
            <CusEmpty v-if="list?.length == 0"></CusEmpty>
        </van-list>
    </van-pull-refresh>


</template>

<script setup lang="ts">
import { routerGo } from '@/router';
import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { getPercent } from '@/utils';
import { t } from '@/locale';

const current = ref(0)
const tabs = computed(() => ([
    { name: t('进行中'), value: 1 },
    { name: t('已完成'), value: 2 }
]))
const params = computed(() => ({ status: tabs.value[current.value].value }))
const { list, props: listProps, loadList } = useLoadList('/api/football/release_orders', 'records', params)
const { props } = usePullRefresh(loadList)
loadList()
const onTabClick = (index: any) => {
    if (current.value == index) return
    current.value = Number(index)
    loadList()
}
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

.head {
    height: 200px;
    width: 100vw;
    background-color: rgba($color: #070237, $alpha: 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px;

    .nav {
        height: 100px;
    }

    .tabs {
        height: 100px;

        .tabItem {
            width: 335px;
            height: 80px;
            background-size: 100% 100%;
        }

        .tabAct {
            background-image: url("@/assets/img/32.png");
            color: #774600;
        }

        .tabDef {
            background-image: url("@/assets/img/33.png");
            color: #686868;
        }
    }
}

.card {
    width: 690px;
    border: 1px solid #F5C245;
    background-color: #00000066;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 30px;

    .progress {
        width: 200px;
        height: 16px;
        border-radius: 8px;
        background-color: #FFFFFF4D;
        overflow: hidden;

        .progressLine {
            height: 16px;
            background-color: #F5C245;
            border-radius: 8px;
        }
    }
}

.pagelog {
    width: 100vw;
    min-height: calc(100vh - 200px);
    min-height: calc(100dvh - 200px);
}
</style>