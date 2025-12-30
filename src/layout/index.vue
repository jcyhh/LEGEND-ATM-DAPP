<template>
    <div class="head flex jb ac">
        <img src="@/assets/img/logo.png" class="logo" @click="routerReplace('/home/index')">
        <div class="flex ac">
            <img src="@/assets/common/lang.png" class="img52 mr20" @click="langRef?.open()">
            <Menu></Menu>
        </div>
    </div>

    <div class="gap100"></div>

    <RouterView></RouterView>

    <CusLang ref="langRef"></CusLang>
</template>

<script setup lang="ts">
import CusLang from '@/components/CusLang/index.vue';
import { ref } from 'vue';
import Menu from './Menu.vue';
import { routerReplace } from '@/router';

const langRef = ref()
</script>

<style lang="scss" scoped>
.head {
    width: 100vw;
    height: 100px;
    background-color: #152535;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px;
    .logo{
        width: 200px;
        height: 48px;
    }

    .connect{
        height: 52px;
        border-radius: 26px;
        padding: 0 20px;
        line-height: 52px;
        background-color: rgba($main-color, $alpha: 0.1);
        border: 1px solid $main-color;
    }

    .level{
        height: 52px;
        border-radius: 16px;
        padding: 0 20px;
        line-height: 52px;
        background-color: $main-color;
        color: #000000;
    }
}

.pop {
    width: 520px;
    height: 100vh;
    padding-top: 100px;

    .menu {
        width: 520px;
        height: calc(100vh - 100px);
        padding: 40px 30px;
        background-color: #191B1A;
        position: relative;
        .item{
            height: 76px;
            border-radius: 38px;
            padding: 0 30px;
            margin-bottom: 25px;
        }
        .border{
            width: 460px;
            height: 76px;
            position: absolute;
        }
    }
}
</style>