<template>
    <div class="reocrd">
        <div class="top flex jb ac">
            <div class="size28 bold">{{ $t('第') }} {{ period }} {{ $t('期') }}</div>
            <div class="size24">{{ $t('当前') }} {{ playerCount }}/{{ maxPlayers }} {{ $t('人') }}</div>
        </div>
        <div class="member">
            <div class="flex col ac" v-for="(item,index) in displayPlayers" :key="item.user_id ?? index">
                <img :src="getAvatar(item)" class="img48">
                <div class="size18 mt10" :class="{ yellow: isCurrentUser(item.user_id) }">{{ item.maddress }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/store'
import activeAvatar from '@/assets/img/16.png'
import emptyAvatar from '@/assets/img/17.png'
import selfAvatar from '@/assets/img/23.png'

const gameStore = useGameStore()
const { gameInfo, currentUserId } = storeToRefs(gameStore)

const period = computed(() => gameInfo.value?.period ?? 0)
const playerCount = computed(() => gameInfo.value?.player_count ?? 0)
const maxPlayers = computed(() => gameInfo.value?.max_players ?? 0)
const players = computed(() => gameInfo.value?.players ?? [])
const displayPlayers = computed(() => {
    const list = players.value.map((item: any) => ({
        ...item,
        avatar: activeAvatar
    }))

    while (list.length < 10) {
        list.push({
            user_id: `empty-${list.length}`,
            maddress: '--',
            avatar: emptyAvatar
        })
    }

    return list.slice(0, 10)
})

const isCurrentUser = (userId: number | string | null | undefined) => {
    if (currentUserId.value === null || userId === null || userId === undefined) return false
    return Number(userId) === currentUserId.value
}

const getAvatar = (item: any) => {
    if (item.avatar === emptyAvatar) return emptyAvatar
    return isCurrentUser(item.user_id) ? selfAvatar : item.avatar
}
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
</style>