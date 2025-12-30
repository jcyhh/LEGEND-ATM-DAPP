<template>
    <RouterView v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </RouterView>

    <CusLoading v-model="dappLoading"></CusLoading>
</template>

<script setup lang="ts">
import detectEthereumProvider from '@metamask/detect-provider'
import { checkChain, getConnectedAddress } from './dapp';
import { useDappStore } from './dapp/store';
import { routerReplace } from './router';
import { delToken, loginPath } from './dapp/config';
import CusLoading from '@/components/CusLoading/index.vue'
import { storeToRefs } from 'pinia';

const dappStore = useDappStore()
const { dappLoading } = storeToRefs(dappStore)

let ethereum:any = null

// 检测钱包环境
const detectProvider = async () => {
    dappStore.providerStatus = 0
    const _ethereum = (window as any).ethereum
    if(_ethereum){
        dappStore.providerStatus = 1
        ethereum = _ethereum
        return;
    }
    const provider = await detectEthereumProvider({
        mustBeMetaMask: false,
        silent: true,
        timeout: 6000
    })
    if(provider){
        dappStore.providerStatus = 1
        ethereum = provider
        return;
    }
    dappStore.providerStatus = 2
}

// 回调：账户切换、断开钱包链接、网络切换
const handlerChanged = async () => {
    delToken()
    dappStore.walletAddress = ''
    removeListener();
    routerReplace(loginPath)
    await init();
}

// 创建监听
const createListener = () => {
    ethereum.on('accountsChanged', handlerChanged); // 账户切换或断开钱包链接
    ethereum.on('chainChanged',  handlerChanged); // 网络切换
}
// 移除监听
const removeListener = () => {
    ethereum.off('accountsChanged', handlerChanged);
    ethereum.off('chainChanged',  handlerChanged);
}

const init = async () => {
    await detectProvider()
    if(!ethereum)return
    dappStore.walletAddress = await getConnectedAddress()
    await checkChain() // 检查网络
    createListener() // 创建监听
}

init()
</script>

<style scoped></style>
