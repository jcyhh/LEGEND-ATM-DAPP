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

                <div class="gamecard mb20" v-for="(item, index) in list" :key="index">
                    <div class="flex jb ac top">
                        <div class="flex ac">
                            <div class="size28 bold mr20">NO.{{ item.period }}</div>
                            <div class="size24 opc5">{{ item.end_time }}</div>
                        </div>
                        <div class="size24 success" v-if="isWin(item)">{{ $t('挑战成功') }}</div>
                        <div class="size24 fail" v-else>{{ $t('挑战失败') }}</div>
                    </div>
                    <div class="flex ac mt70">
                        <div class="flex1">
                            <span class="size24 opc5 mr10">{{ $t('投入钻石') }}</span>
                            <span class="size28 bold" v-init="item.invested"></span>
                        </div>
                        <div class="flex1" v-if="currentType !== 3">
                            <span class="size24 opc5 mr10">{{ $t('幸运用户') }}</span>
                            <span class="size28 bold">{{ getWinnerText(item) }}</span>
                        </div>
                    </div>
                    <div class="flex ac mt30">
                        <div class="flex1">
                            <span class="size24 opc5 mr10">{{ $t('获得钻石') }}</span>
                            <span class="size28 bold" v-if="isWin(item)">{{ rewardText }}</span>
                            <span class="size28 bold" v-else v-init="item.received"></span>
                        </div>
                    </div>
                    <div class="flex jc ac mt40" v-if="currentType === 3">
                        <img src="@/assets/img/29.png" class="img22 mr6">
                        <img src="@/assets/img/29.png" class="img22 mr6">
                        <img src="@/assets/img/29.png" class="img22 mr24">
                        <div class="size26 bold title">{{ $t('幸运用户') }}</div>
                        <img src="@/assets/img/29.png" class="img22 ml24">
                        <img src="@/assets/img/29.png" class="img22 ml6">
                        <img src="@/assets/img/29.png" class="img22 ml6">
                    </div>
                    <div class="mt30 tc" v-if="currentType === 3">
                        <div class="size20" v-if="getWinners(item).length">
                            <span class="winner-item pl10 pr10" v-for="(winner, winnerIndex) in getWinners(item)" :key="`${index}-${winnerIndex}`">{{ winner }}</span>
                        </div>
                        <div class="size20 tc opc5" v-else>--</div>
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
import { t } from '@/locale';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const parseGameType = (value: unknown): 1 | 2 | 3 => {
    const rawValue = Array.isArray(value) ? value[0] : value
    const type = Number(rawValue)
    if (type === 1 || type === 3) return type
    return 2
}
const currentType = computed(() => parseGameType(route.query.type))
const rewardText = computed(() => currentType.value === 3 ? '获得1.2倍钻石BUB' : t('获得1.5倍钻石BUB'))
const isWin = (item: any) => {
    const result = Number(item?.result)
    if (currentType.value === 3) return result === 1
    return result === 2
}
const requestParams = computed(() => ({
    type: currentType.value
}))

const { list, props: listProps, loadList } = useLoadList('/api/football/records', 'records', requestParams)
const { props } = usePullRefresh(loadList)
loadList()

watch(currentType, () => {
    loadList()
})

const getWinnerText = (item: any) => {
    const loser = item?.loser

    if (typeof loser === 'string' && loser) return loser
    return t('未结算')
}
const getWinners = (item: any) => {
    if (!Array.isArray(item?.winners)) return []
    return item.winners.filter((winner: unknown) => typeof winner === 'string' && winner)
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
</style>