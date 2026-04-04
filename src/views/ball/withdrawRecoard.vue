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
            <div class="flex2 tc size36 bold">{{ $t('提现记录') }}</div>
            <div class="flex1"></div>
        </div>
        <div class="tabs flex jb ac">
            <div class="tabItem flex jc ac size28 bold" :class="current==index?'tabAct':'tabDef'" v-for="(item,index) in tabs" :key="index" @click="onTabClick(index)">{{ item.name }}</div>
        </div>
    </div>
    
    <div class="gap200"></div>

    <van-pull-refresh class="pagelog rel" v-bind="props">
        <van-list class="pagelog rel" v-bind="listProps">

            <div class="pl30 pr30 pt30">

                <div class="card mb20" v-for="(item,index) in list" :key="index">
                    <div class="flex jb ac size28">
                        <div>{{ $t('提现') }}</div>
                        <div class="bold">
                            <span v-init="item.amount"></span>
                        </div>
                    </div>
                    <div class="flex jb ac size24 mt10 opc5">
                        <div>{{ item.created_at }}</div>
                        <div>{{ tabs[current].name }}</div>
                    </div>
                </div>

            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>
    </van-pull-refresh>

    
</template>

<script setup lang="ts">
import { routerGo } from '@/router';
import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { t } from '@/locale';

const current = ref(0)
const tabs = computed(()=>([
    {name:t('钻石'),value:'balance_diamond'},
    {name:'BUB',value:'balance_bub'}
]))
const params = computed(()=>({ccy: tabs.value[current.value].value}))
const { list, props: listProps, loadList } = useLoadList('/api/withdraw', 'withdraw', params)
const { props } = usePullRefresh(loadList)
loadList()
const onTabClick = (index:any) => {
    if(current.value == index)return
    current.value = Number(index)
    loadList()
}
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
.head{
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
    .nav{
        height: 100px;
    }
    .tabs{
        height: 100px;
        .tabItem{
            width: 335px;
            height: 80px;
            background-size: 100% 100%;
        }
        .tabAct{
            background-image: url("@/assets/img/32.png");
            color: #774600;
        }
        .tabDef{
            background-image: url("@/assets/img/33.png");
            color: #686868;
        }
    }
}

.card{
    width: 690px;
    border: 1px solid #F5C245;
    background-color: #00000066;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 30px;
    .progress{
        width: 200px;
        height: 16px;
        border-radius: 8px;
        background-color: #FFFFFF4D;
        overflow: hidden;
        .progressLine{
            height: 16px;
            background-color: #F5C245;
            border-radius: 8px;
        }
    }
}

.pagelog{
    width: 100vw;
    min-height: calc(100vh - 200px);
    min-height: calc(100dvh - 200px);
}
</style>