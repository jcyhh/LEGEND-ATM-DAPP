<template>
    <Bg></Bg>
    
    <div class="start flex col jc ac">
        <img src="@/assets/img/logo.png" class="logo animate__animated animate__bounceInLeft" />
    </div>

    <div class="tips" v-if="providerStatus==0">
        <van-loading></van-loading>
    </div>
    <div class="size28 mt30 white tips animate__animated animate__fadeInUp" v-if="providerStatus==2">{{ $t('请安装 MateMask !') }}</div>
</template>

<script setup lang="ts">
import { getSign } from '@/dapp';
import { getRef, getToken, homePath, setRef, setToken } from '@/dapp/config';
import { useDappStore } from '@/dapp/store';
import { routerReplace } from '@/router';
import { apiPost } from '@/utils/request';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import Bg from '@/components/Bg.vue';

const { params } = useRoute()
if(params?.ref)setRef(params?.ref as any)

const dappStore = useDappStore()
const { providerStatus, walletAddress } = storeToRefs(dappStore)

// 登录
const loginIn = async () => {
    const signInfo = await getSign('Login')
    apiPost('/api/auth/login',{
        ref: getRef(),
        address: walletAddress.value,
        ...signInfo
    }).then((res:any)=>{
        setToken(res.token)
        routerReplace(homePath)
    })
}

watch(providerStatus, status => status==1 && setTimeout(() => getToken() ? routerReplace(homePath) : loginIn(), 1200), {immediate: true})
</script>

<style lang="scss" scoped>
.start{
    width: 100vw;
    height: 100vh;
}
.logo{
    width: 300px;
    height: auto;
}
.tips{
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
}
</style>