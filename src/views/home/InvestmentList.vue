<template>
    <div class="pl30 pr30">
        <div class="flex ac td tc size24" v-for="(item,index) in list" :key="index">
            <div class="flex1 opc6 bold">{{ index }}</div>
            <div class="flex2 pr5">
                <div class="size22">{{ item.created_at }}</div>
                <van-count-down :time="item.djs * 1000" @finish="success" v-if="item.djs > 0">
                    <template #default="timeData">
                        <span class="red size22">{{ timeData.hours }}h</span>
                        <span class="red size22 ml5 mr5">{{ timeData.minutes }}m</span>
                        <span class="red size22">{{ timeData.seconds }}s</span>
                    </template>
                </van-count-down>
            </div>
            <div class="flex1 yellow bold pr5 br" v-init="item.amount"></div>
            <div class="flex2 bold pr5 br" v-init="item.reward" v-if="item.reward && item.reward > 0"></div>
            <div class="flex2 bold pr5 br" v-else>
                <van-loading />
            </div>
            <div class="flex2 pr5">
                <div class="green click" v-if="item.is_unstaking" @click="openpop(item.index)">{{ $t('点击赎回') }}</div>
                <div class="opc6" v-else>{{ $t('等待赎回') }}</div>
            </div>
        </div>
    </div>
    <CusEmpty v-if="list.length==0"></CusEmpty>

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac">
                <van-icon name="cross" color="#152535" :size="30" />
                <div class="size30 font2">{{ $t('提示') }}</div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>

            <div class="tc size30 font2 mt60">{{ $t('确定要赎回吗？') }}</div>

            <div class="flex ac mt60 font2 size28">
                <div class="popCancel flex1 mr20" @click="show=false">{{ $t('取消') }}</div>
                <div class="popbtn flex1" @click="submit">{{ $t('确定') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { useStaking } from '@/dapp/contract/staking';
import bus from '@/bus'
// import { unstakeAndBurn } from '@/dapp/contract/batchInvoker'
// import { apiGet } from '@/utils/request';

const userStore = useUserStore()
const { orders } = storeToRefs(userStore)

const { writeUnstake } = useStaking()

const list = computed(()=>{
    if(orders.value.length===0)return []
    return orders.value.filter((item:any)=>item.status===1)
})

const show = ref(false)
const index = ref(0)

const openpop = (i:number) => {
    index.value = i
    show.value = true
}

const success = () => bus.emit('orderSuccess')

const submit = async () => {
    // const burnInfo:any = await apiGet('/api/index/reward_burned')
    // if(JSON.stringify(burnInfo)==='[]'){
    //     // 赎回
    //     await writeUnstake(index.value)
    // }else{
    //     // 7702: 赎回 + 销毁
    //     await unstakeAndBurn([index.value], [burnInfo.address, burnInfo.index])
    // }
    await writeUnstake(index.value)
    show.value = false
    success()
}
</script>

<style lang="scss" scoped>
.td{
    padding: 30px 0;
    border-bottom: 1px solid #FFFFFF1A;
}
.click{
    text-decoration: underline;
}
</style>