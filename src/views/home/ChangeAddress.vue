<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac mb40">
                <van-icon name="cross" color="#152535" :size="30" />
                <div class="size30 font2">{{ $t('更换地址') }}</div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>

            <div class="size26 mb20" v-if="extra_address">{{ $t('当前网体地址') }} <span v-init:address="extra_address"></span></div>
            <div class="inp flex">
                <input type="text" v-model="inputAddress" :placeholder="$t('请输入新地址')" class="flex1 size26">
            </div>

            <div class="flex ac mt60 font2 size28">
                <div class="popCancel flex1 mr20" @click="show=false">{{ $t('取消') }}</div>
                <div class="popbtn flex1" @click="submit">{{ $t('确定') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiGet, apiPost } from '@/utils/request';
import { message } from '@/utils/message';
import { t } from '@/locale';

const show = ref(false)

const index = ref()

const inputAddress = ref()

const extra_address = ref()
const open = (i:number) => {
    index.value = i
    inputAddress.value = ''
    show.value = true
    apiGet('/api/users/my').then((res:any)=>{
        extra_address.value = res.extra_address
    })
}

const submit = async () => {
    if(!inputAddress.value)return message(t('请输入新地址'))
    apiPost('/api/users/my/extra_address', {
        extra_address: inputAddress.value
    }).then(()=>{
        show.value = false
        message(t('更换成功'), 'success')
    })
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>

</style>