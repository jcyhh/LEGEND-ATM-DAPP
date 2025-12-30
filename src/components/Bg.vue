<template>
    <img src="@/assets/img/bg.png" class="bg">

    <div class="head">
        <Plasma
        color="#1989F5"
        :speed="1.2"
        :scale="1"
        :opacity="0.5"
        :mouseInteractive="true"
        />
    </div>
</template>

<script setup lang="ts">
import Plasma from '@/components/Plasma.vue';
</script>

<style lang="scss" scoped>
.bg{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    object-fit: cover;
}
.head{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
}
</style>