<template>
    <div class="card mb24" v-for="(item,index) in list" :key="index">
        <div class="flex jb">
            <div>
                <div class="mb12 size24 opc6">{{ $t('协议结算值') }}</div>
                <div>
                    <span class="size44 mr10" v-init="item.amount"></span>
                    <span class="size30">USDT</span>
                </div>
            </div>
            <!-- <div class="btn flex jc ac size26" @click="cancelRef?.open(index)">{{ $t('取消排队') }}</div> -->
        </div>
        <div class="flex jb ac mt30">
            <div class="size24 opc5">{{ $t('参与时间') }} {{ item.created_at }}</div>
        </div>
    </div>
    <CusEmpty v-if="list.length==0"></CusEmpty>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import bus from '@/bus'
import { apiGet } from '@/utils/request';

// const cancelRef = ref()

const list = ref<any[]>([])
const loadList = () => {
    apiGet('/api/index/queue_list').then((res:any)=>{
        list.value = res.queues
    })
}

let timer:any = null
const setTimer = async () => timer = setInterval(() => loadList(), 10000);

onMounted(()=>{
    loadList()
    setTimer()
    bus.on('orderSuccess', loadList)
})

onUnmounted(()=>{
    bus.off('orderSuccess', loadList)
    if(timer){
        clearInterval(timer)
        timer = null
    }
})
</script>

<style lang="scss" scoped>
.card{
    background-color: #152535B2;
    border: 1px solid #FFFFFF1A;
    padding: 24px;
    border-radius: 20px;
    .btn{
        height: 48px;
        border-radius: 24px;
        padding: 0 20px;
        border: 1px solid #1989F5;
        background-color: #1989F51A;
        color: #1989F5;
    }
    .line{
        height: 1px;
        background-color: #FFFFFF1A;
    }
}
.fastbtn{
    height: 68px;
    border-radius: 34px;
    padding: 0 20px;
    border: 1px solid #1989F5;
    background-color: #1989F51A;
    color: #1989F5;
}
</style>