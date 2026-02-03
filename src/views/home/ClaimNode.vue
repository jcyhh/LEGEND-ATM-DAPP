<template>
    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac">
                <van-icon name="cross" color="#152535" :size="30" />
                <div class="size30 font2">{{ $t('提取') }}</div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>

            <div class="inp flex ac mt40">
                <input type="number" v-model="inputAmount" :placeholder="$t('请输入领取额度')" class="flex1 size26">
                <div class="main size26" @click="inputAll">全部</div>
            </div>
            <div class="size26 mt20 gray">
                <span class="mr10">{{ $t('权益值') }}</span>
                <span v-init="balance"></span>
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
import { useProject } from '@/dapp/contract/project';
import { checkGasBalance, getSign } from '@/dapp';
import { apiPost } from '@/utils/request';
import { message } from '@/utils/message';
import { t } from '@/locale';

const emits = defineEmits(['success'])

const props = defineProps(['balance'])

const { writeClaim } = useProject()

const show = ref(false)

const index = ref()

const inputAmount = ref()

const open = (i:number) => {
    inputAmount.value = ''
    index.value = i
    show.value = true
}

const inputAll = () => {
    const num = props.balance
    inputAmount.value = Number(num)
}

const submit = async () => {
    if(!inputAmount.value) return message(t('请输入领取额度'))

    // await checkGasBalance()

    const signInfo = await getSign('Claim')

    const res:any = await apiPost('/api/withdraw', {
        amount: inputAmount.value,
        ccy: 'balance_usdt',
        ...signInfo
    })

    const { id, token, sign_amount, expired_at, sign } = res.info

    console.log(id, token, sign_amount, expired_at, sign);
    
    await writeClaim(id, token, sign_amount, expired_at, sign)

    show.value = false
    emits('success')
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>

</style>