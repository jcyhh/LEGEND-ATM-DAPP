<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac">
                <van-icon name="cross" color="#152535" :size="30" />
                <div class="size30 font2">{{ $t('提示') }}</div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>

            <div class="tc size30 font2 mt60">{{ $t('确定要领取奖励吗？') }}</div>

            <div class="flex ac mt60 font2 size28">
                <div class="popCancel flex1 mr20" @click="show=false">{{ $t('取消') }}</div>
                <div class="popbtn flex1" @click="submit">{{ $t('确定') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { useStaking } from '@/dapp/contract/staking';
import { ref } from 'vue';
import bus from '@/bus'

const { writeClaim } = useStaking()

const show = ref(false)

const index = ref()

const open = (i:number) => {
    index.value = i
    show.value = true
}

const submit = async () => {
    await writeClaim(index.value)

    show.value = false
    bus.emit('orderSuccess')
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>

</style>