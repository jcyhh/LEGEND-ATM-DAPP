<template>
    <div>
        <div class="cusNav flex jb ac" :style="{backgroundColor: `rgba(18,18,18,${scrollProgress})`}">
            <div class="flex1" @click="back">
                <van-icon name="arrow-left" :color="currentColor" :size="20" />
            </div>
            <div class="flex2 size32 tc" :style="{color:currentColor}">{{ title || '' }}</div>
            <div class="flex1 flex je ac">
                <slot></slot>
            </div>
        </div>
        <div class="gap100" v-if="!scroll && !opacity"></div>
    </div>
</template>

<script setup lang="ts">
/**
 * 二级页面导航栏
 */
import { ref, onUnmounted, computed  } from 'vue'
import { routerGo } from '@/router'

let props = defineProps(['title', 'scroll', 'color', 'opacity'])

// 导航栏背景色随着页面滚动从透明变不透明
const scrollProgress = ref(1)
// 字体色从白到黑
const currentColor = computed(() => {
    if(props.color=='white'){
        const grayValue = Math.round((1 - scrollProgress.value) * 255)
        const hex = grayValue.toString(16).padStart(2, '0')
        return `#${hex}${hex}${hex}`
    }else{
        return '#FFFFFF'
    }
})
function handleScroll(){
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
    scrollProgress.value = Math.min(scrollPosition / 200, 1)
}
if(props.scroll){
    scrollProgress.value = 0
    window.addEventListener('scroll', handleScroll)
}else if(props.opacity){
    scrollProgress.value = 0
}

// 返回按钮
function back(){
    routerGo()
}

// 移除监听
onUnmounted(()=>{
    if(props.scroll)window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.cusNav{
    width: 100vw;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px;
}
</style>