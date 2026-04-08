<template>
    <div class="reocrd">
        <div class="top flex jb ac">
            <div class="size28 bold">{{ $t('第') }} {{ period }} {{ $t('期') }}</div>
            <div class="size24">{{ $t('当前') }} {{ playerCount }}/{{ maxPlayers }} {{ $t('人') }}</div>
        </div>
        <van-swipe class="my-swipe" :autoplay="showPagination ? 3000 : 0" :show-indicators="false" @change="handleSwipeChange">
            <van-swipe-item v-for="(page, pageIndex) in pagedPlayers" :key="pageIndex">
                <div class="member">
                    <div class="flex col ac" v-for="(item,index) in page" :key="item.user_id ?? `${pageIndex}-${index}`">
                        <img :src="getAvatar(item)" class="img48">
                        <div class="size18 mt10" :class="{ yellow: isCurrentUser(item.user_id) }">{{ item.maddress }}</div>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="flex jc ac" v-if="showPagination">
            <div class="dot mr6" :class="current === index - 1 ? 'dotAct' : 'dotDef'" v-for="index in pageCount" :key="index"></div>
        </div>
        <div class="gap20" v-if="showPagination"></div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/store'
import activeAvatar from '@/assets/img/16.png'
import emptyAvatar from '@/assets/img/17.png'
import selfAvatar from '@/assets/img/23.png'

const current = ref(0)

const gameStore = useGameStore()
const { gameInfo, currentUserId } = storeToRefs(gameStore)

const period = computed(() => gameInfo.value?.period ?? 0)
const playerCount = computed(() => gameInfo.value?.player_count ?? 0)
const maxPlayers = computed(() => gameInfo.value?.max_players ?? 0)
const players = computed(() => gameInfo.value?.players ?? [])
const pageSize = 10
const displaySlotCount = computed(() => {
    const requiredSlots = Math.max(Math.ceil(players.value.length / pageSize), 1) * pageSize
    const maxSlots = maxPlayers.value > 0
        ? Math.ceil(maxPlayers.value / pageSize) * pageSize
        : requiredSlots

    return Math.min(requiredSlots, maxSlots)
})
const displayPlayers = computed(() => {
    const list = players.value.map((item: any) => ({
        ...item,
        avatar: activeAvatar
    }))

    while (list.length < displaySlotCount.value) {
        list.push({
            user_id: `empty-${list.length}`,
            maddress: '--',
            avatar: emptyAvatar
        })
    }

    return list.slice(0, displaySlotCount.value)
})
const pagedPlayers = computed(() => {
    const pages = []

    for (let index = 0; index < displayPlayers.value.length; index += pageSize) {
        pages.push(displayPlayers.value.slice(index, index + pageSize))
    }

    return pages
})
const pageCount = computed(() => pagedPlayers.value.length)
const showPagination = computed(() => pageCount.value > 1)

const isCurrentUser = (userId: number | string | null | undefined) => {
    if (currentUserId.value === null || userId === null || userId === undefined) return false
    return Number(userId) === currentUserId.value
}

const getAvatar = (item: any) => {
    if (item.avatar === emptyAvatar) return emptyAvatar
    return isCurrentUser(item.user_id) ? selfAvatar : item.avatar
}

const handleSwipeChange = (index: number) => {
    current.value = index
}

watch(pageCount, (count) => {
    if (count <= 1 || current.value >= count) {
        current.value = 0
    }
}, { immediate: true })
</script>

<style lang="scss" scoped>
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
    .member{
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 20px;
        padding: 30px 20px;
    }
}
.dot{
    height: 8px;
    border-radius: 4px;
    transition: all 0.3s;
}
.dotAct{
    width: 40px;
    background-color: #F5C245;
}
.dotDef{
    width: 8px;
    background-color: #FFFFFF80;
}
</style>