<template>
    <Bg></Bg>
    <div class="content">
        <img src="@/assets/img/8.png" class="pic8">
        <div class="box flex col jc">
            <div class="size20 bold">{{ $t('恭喜! 您现在是LEGEND ATM节点的骄傲持有者!') }}</div>
        </div>
        <div class="pl200 size32 bold">
            <span class="mr20">{{ $t('节点权重值') }}</span>
            <span class="yellow" v-init="info?.node_amount"></span>
        </div>
        <div class="top flex col je mt86">
            <div class="yellow size32 bold">{{ $t('您的节点福利') }}</div>
            <div class="flex jb ac mt40">
                <div class="size28">{{ $t('权益值') }}</div>
                <div class="flex ac">
                    <span class="size28 bold blue" v-init="info?.balance_usdt"></span>
                    <span class="size28 bold ml5 mr10">Token</span>
                    <span class="claim flex jc ac" @click="claimRef?.open()">{{ $t('领取') }}</span>
                </div>
            </div>
            <div class="flex jb ac mt40">
                <div class="size28">{{ $t('待领空投') }}</div>
                <div>
                    <span class="size28 bold blue">{{ info?.airdrop_num }}</span>
                    <span class="size28 bold ml5">{{ $t('枚') }}</span>
                </div>
            </div>
            <div class="flex jb ac mt40">
                <div class="size28">{{ $t('义务贡献值') }}</div>
                <div class="size28 bold tr" v-init="total"></div>
            </div>
        </div>

        <div class="size30 mt40 mb30">{{ $t('资产明细') }}</div>

        <div class="list">
            <van-list v-bind="props">
                <div class="cell mb30" v-for="(item, index) in list" :key="index">
                    <div class="flex jb ac bold size28">
                        <div>{{ item.content }}</div>
                        <div class="bold" :class="item.is_inc ? 'main' : ''">
                            <span>{{ item.is_inc ? '+' : '-' }}</span>
                            <span v-init="item.amount"></span>
                            <span class="ml10">Token</span>
                        </div>
                    </div>
                    <div class="flex jb ac mt10">
                        <div class="size24 gray">{{ item.created_at }}</div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length == 0"></CusEmpty>
            </van-list>
        </div>
    </div>

    <ClaimNode ref="claimRef" :balance="info?.balance_usdt" @success="loadData"></ClaimNode>
</template>

<script setup lang="ts">
import Bg from '@/components/Bg.vue';
import ClaimNode from './home/ClaimNode.vue';
import { computed, ref } from 'vue';
import { apiGet } from '@/utils/request';
import { computedSub } from '@/utils';
import { useLoadList } from '@/hooks/useLoadList';
import CusEmpty from '@/components/CusEmpty/index.vue'

const claimRef = ref()

const info = ref()
const loadData = () => apiGet('/api/users/my').then((res: any) => info.value = res)
loadData()

const total = computed(() => {
    if (info.value) {
        const num = computedSub(info.value?.check_xq_kpi,info.value?.xq_kpi)
        return num > 0 ? num : 0
    }
})

const params = computed(() => ({ ccy: 'balance_usdt' }))
const { list, props, loadList } = useLoadList('/api/users/my/balance_logs', 'balance_logs', params)
loadList()
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    z-index: 5;
    padding: 60px 30px 40px 30px;

    .pic8 {
        width: 240px;
        height: 240px;
        position: absolute;
        top: 20px;
        left: 0;
        z-index: 2;
    }

    .box {
        width: 690px;
        height: 128px;
        background-image: url("@/assets/img/7.png");
        background-size: 100% 100%;
        position: absolute;
        top: 125px;
        left: 30px;
        z-index: 1;
        padding: 0 60px 0 200px;
    }
}

.top {
    height: 454px;
    background-image: url("@/assets/img/6.png");
    background-size: 100% 100%;
    padding: 0 30px 40px 30px;

    .claim {
        border: 1px solid $yellow;
        color: $yellow;
        height: 40px;
        border-radius: 20px;
        padding: 0 20px;
        font-size: 24px;
    }
}

.list {
    background-color: #152535;
    border: 1px solid #333333;
    padding: 30px;
    border-radius: 20px;

    .cell {
        border-bottom: 1px solid #FFFFFF1A;
        padding-bottom: 30px;
    }
}

.border0 {
    border: none !important;
}
</style>