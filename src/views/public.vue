<template>
    <Bg></Bg>

    <div class="content pt40 pl30 pr30">

        <div class="tc size24">{{ $t('团队业绩') }}(USDT)</div>

        <div class="tc font1 size56 yellow" v-init="userInfo?.team_kpi"></div>

        <div class="flex jb ac mt30">
            <div class="size24 bold">{{ $t('当前等级') }}</div>
            <Level></Level>
        </div>

        <div class="flex jb ac box size24 bold mt30">
            <div>{{ $t('个人业绩') }}</div>
            <div v-init="userInfo?.kpi"></div>
        </div>

        <div class="size30 mt40 mb30">{{ $t('直推列表') }}</div>

        <van-list v-bind="props">
            <div class="card mb16" v-for="(item,index) in list" :key="index">
                <div class="size28" v-init:address="item.address"></div>
                <div class="grey size24 mt10">2025-02-22 12:22:45</div>
                <div class="line mt24"></div>
                <div class="flex jb ac mt24">
                    <div class="grey size24">{{ $t('团队业绩') }}</div>
                    <div class="size24">
                        <span v-init="item.team_kpi" class="mr10"></span>
                        <span>USDT</span>
                    </div>
                </div>
                <div class="flex jb ac mt24">
                    <div class="grey size24">{{ $t('个人业绩') }}</div>
                    <div class="size24">
                        <span v-init="item.kpi" class="mr10"></span>
                        <span>USDT</span>
                    </div>
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>

    </div>
</template>

<script setup lang="ts">
import Bg from '@/components/Bg.vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { apiGet } from '@/utils/request';
import { ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import Level from './public/Level.vue';

const userInfo = ref()
const loadData = () => apiGet('/api/users/my').then(res=>userInfo.value=res)
loadData()

const { list, props, loadList } = useLoadList('/api/users/my/referrals', 'referrals')
loadList()
</script>

<style lang="scss" scoped>
.content{
    position: relative;
    z-index: 5;
}
.box{
    height: 100px;
    border-radius: 20px;
    background: linear-gradient(to right, #1989F5, #0064C7);
    padding: 0 30px;
}
.card{
    border: 1px solid #FFFFFF1A;
    background-color: #152535;
    border-radius: 20px;
    padding: 30px;
    .line{
        width: 100%;
        height: 1px;
        background-color: #FFFFFF1A;
    }
}
</style>