<template>
    <img src="@/assets/common/menu.png" class="img52" @click="openMenu">

    <van-popup v-model:show="show" position="right" style="background-color: transparent !important;" overlay-class="cusMask" teleport="#app">
        <div class="menu">
            <div class="flex jb ac mb80">
                <img src="@/assets/img/logo.png" class="logo">
                <img src="@/assets/common/close.png" class="img40" @click="show=false">
            </div>
            <Invite></Invite>
            <div class="mt76">{{ $t('服务') }}</div>
            <div class="flex mt40 nav">
                <div class="flex1 flex col ac" @click="goPath(homePath)">
                    <img src="@/assets/menu/agreementHL.png" class="img56" v-if="$route.path==homePath">
                    <img src="@/assets/menu/staking.png" class="img56" v-else>
                    <div class="size26 mt20">{{ $t('协同协议') }}</div>
                </div>
                <div class="flex1 flex col ac" @click="goPath('/home/index')">
                    <img src="@/assets/menu/stakingHL.png" class="img56" v-if="$route.path=='/home/index'">
                    <img src="@/assets/menu/staking.png" class="img56" v-else>
                    <div class="size26 mt20">{{ $t('流动性协议') }}</div>
                </div>
                <div class="flex1 flex col ac" @click="goPath('/public/index')">
                    <img src="@/assets/menu/publicHL.png" class="img56" v-if="$route.path=='/public/index'">
                    <img src="@/assets/menu/public.png" class="img56" v-else>
                    <div class="size26 mt20">{{ $t('公共联盟') }}</div>
                </div>
                <!-- <div class="flex1 flex col ac" @click="openLink('http://bubc2c.legend.rocks')">
                    <img src="@/assets/menu/exchange.png" class="img56">
                    <div class="size26 mt20">{{ $t('C2C交易') }}</div>
                </div> -->
            </div>
            <div class="flex mt40 nav">
                <div class="flex1 flex col ac" @click="goPath('/node/index')">
                    <img src="@/assets/menu/nodeHL.png" class="img56" v-if="$route.path=='/node/index'">
                    <img src="@/assets/menu/node.png" class="img56" v-else>
                    <div class="size26 mt20">{{ $t('节点') }}</div>
                </div>
                <div class="flex1 flex col ac">
                    <img src="@/assets/menu/reportHL.png" class="img56" v-if="$route.path=='/report/index'">
                    <img src="@/assets/menu/report.png" class="img56" v-else>
                    <div class="size26 mt20">{{ $t('安全审计') }}</div>
                </div>
                <div class="flex1 flex col ac" @click="goBall">
                    <img src="@/assets/menu/ballHL.png" class="img56" v-if="$route.path=='/door'">
                    <img src="@/assets/menu/ball.png" class="img56" v-else>
                    <div class="size26 mt20">{{ $t('点球大战') }}</div>
                </div>
            </div>
            <div class="mt76">{{ $t('联系我们') }}</div>
            <div class="flex mt40 nav">
                <div class="flex1 flex col ac">
                    <img src="@/assets/menu/x.png" class="img56">
                    <div class="size26 mt20">X</div>
                </div>
                <div class="flex1 flex col ac">
                    <img src="@/assets/menu/telegram.png" class="img56">
                    <div class="size26 mt20">Telegram</div>
                </div>
                <div class="flex1"></div>
            </div>

            <div class="bottom">
                <div class="tc size24">{{ $t('极速链接') }}</div>
                <div class="flex jc">
                    <div class="link" @click="openLink('https://a.legend.rocks')">https://a.legend.rocks</div>
                </div>
                <div class="lang flex jb ac" @click="langRef?.open()">
                    <div class="flex ac">
                        <img src="@/assets/common/lang.png" class="img56 mr16">
                        <div class="size26">{{ currentLang?.name }}</div>
                    </div>
                    <van-icon name="arrow-down" color="#8396A7" />
                </div>
            </div>
            
        </div>
    </van-popup>

    <CusLang ref="langRef"></CusLang>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CusLang from '@/components/CusLang/index.vue';
import { langs, t } from '@/locale'
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';
import { routerPush, routerReplace } from '@/router';
import Invite from '@/views/home/Invite.vue';
import { openLink } from '@/utils';
import { apiGet } from '@/utils/request';
import { message } from '@/utils/message';
import { homePath } from '@/dapp/config';

const useStore = useAppStore()
const { lang } = storeToRefs(useStore)

const show = ref(false)

const langRef = ref()

const goBall = () => {
    if(parent_id.value > 0){
        routerPush('/door')
    }else{
        message(t('请先绑定上级'))
    }
}

const parent_id = ref(0)
const openMenu = () => {
    show.value = true
    apiGet('/api/users/my').then((res:any)=>{
        parent_id.value = res.parent_id
    })
}

const currentLang = computed(()=>langs.find(item => item.lang === lang.value))

const goPath = (path:string) => {
    routerReplace(path)
    show.value = false
}
</script>

<style lang="scss" scoped>
.menu{
    width: 600px;
    height: 100vh;
    border: 1px solid #FFFFFF33;
    background-color: #152535;
    padding: 30px;
    .logo{
        width: 200px;
        height: 48px;
    }
    .nav{
        color: #8396A7;
    }
    .bottom{
        width: 540px;
        position: absolute;
        bottom: 40px;
        left: 30px;
        .link{
            font-size: 24px;
            text-decoration: underline;
            color: $blue;
            margin: 10px 0 20px 0;
        }
        .lang{
            height: 80px;
            border-radius: 40px;
            background-color: #213446;
            padding: 0 30px 0 10px;
        }
    }
    
}
</style>