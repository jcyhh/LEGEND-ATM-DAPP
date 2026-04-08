<template>
    <div class="aniBox">
        <div class="aniItem" :class="{ aniHidden: activeAni !== 'success' }" ref="successAniRef"></div>
        <div class="aniItem failItem" :class="{ aniHidden: activeAni !== 'fail' }" ref="failAniRef"></div>
        <div class="standby" :class="{ aniHidden: activeAni !== 'standby' }" ref="standbyAniRef"></div>
    </div>
</template>

<script setup lang="ts">
import lottie, { type AnimationItem } from 'lottie-web'
import failData from '@/assets/ani/fail/data.json'
import standbyData from '@/assets/ani/standby/data.json'
import successData from '@/assets/ani/success/data.json'
import { onMounted, onUnmounted, ref } from 'vue'

type AniType = 'success' | 'fail' | 'standby'

const emit = defineEmits<{
    complete: [type: Exclude<AniType, 'standby'>]
}>()

const successAniRef = ref<HTMLElement>()
const failAniRef = ref<HTMLElement>()
const standbyAniRef = ref<HTMLElement>()
const activeAni = ref<AniType>('standby')

let successAni: AnimationItem | null = null
let failAni: AnimationItem | null = null
let standbyAni: AnimationItem | null = null
let playingAni: Exclude<AniType, 'standby'> | null = null

const handleAniComplete = (type: Exclude<AniType, 'standby'>) => {
    if (playingAni !== type) return
    playingAni = null
    emit('complete', type)
}

const playSuccess = () => {
    if (!successAni || playingAni) return

    playingAni = 'success'
    activeAni.value = 'success'
    standbyAni?.stop()
    failAni?.stop()
    successAni.goToAndPlay(0, true)
}

const showStandby = () => {
    activeAni.value = 'standby'
    successAni?.stop()
    failAni?.stop()
    standbyAni?.play()
    playingAni = null
}

const playFail = () => {
    if (!failAni || playingAni) return

    playingAni = 'fail'
    activeAni.value = 'fail'
    successAni?.stop()
    standbyAni?.stop()
    failAni?.goToAndPlay(0, true)
}

defineExpose({
    playSuccess,
    showStandby,
    playFail
})

onMounted(() => {
    if (successAniRef.value) {
        successAni = lottie.loadAnimation({
            container: successAniRef.value,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: successData
        })
        successAni.addEventListener('complete', () => handleAniComplete('success'))
    }

    if (failAniRef.value) {
        failAni = lottie.loadAnimation({
            container: failAniRef.value,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: failData
        })
        failAni.addEventListener('complete', () => handleAniComplete('fail'))
    }

    if (standbyAniRef.value) {
        standbyAni = lottie.loadAnimation({
            container: standbyAniRef.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: standbyData
        })
    }
})

onUnmounted(() => {
    successAni?.destroy()
    failAni?.destroy()
    standbyAni?.destroy()
})
</script>

<style lang="scss" scoped>
.aniBox{
    width: 560px;
    height: 560px;
    position: relative;
}
.aniItem{
    width: 560px;
    height: 560px;
    position: absolute;
    top: 0;
    left: 0;
}
.failItem{
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
}
.standby{
    width: 172px;
    height: 172px;
    position: absolute;
    bottom: 0;
    left: 200px;
}
.aniHidden{
    opacity: 0;
    pointer-events: none;
}
</style>