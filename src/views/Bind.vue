<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac mb40">
                <div class="size30 font2">{{ $t('同步关系') }}</div>
            </div>

            <div class="inp flex">
                <input type="text" v-model="inputAddress" :placeholder="$t('请输入邀请人地址')" class="flex1 size26">
            </div>

            <div class="flex ac mt40 font2 size28">
                <div class="popbtn flex1" @click="submit">{{ $t('确定') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiPost } from '@/utils/request';
import { message } from '@/utils/message';
import { t } from '@/locale';
import { getSign } from '@/dapp';
import { getRef, homePath, setToken } from '@/dapp/config';
import { useDappStore } from '@/dapp/store';
import { storeToRefs } from 'pinia';
import { routerReplace } from '@/router';

const dappStore = useDappStore()
const { walletAddress } = storeToRefs(dappStore)

const show = defineModel<boolean>('show', { default: false })

const inputAddress = ref()

const submit = async () => {
    if(!inputAddress.value)return message(t('请输入邀请人地址'))
    const signInfo = await getSign('Login')
    apiPost('/api/auth/login',{
        ref: getRef(),
        address: walletAddress.value,
        parent_address: inputAddress.value,
        ...signInfo
    }).then((res:any)=>{
        setToken(res.token)
        routerReplace(homePath)
    })
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>

</style>