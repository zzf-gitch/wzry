<template>
    <div class="tabss">
        <div class="tab_box">
            <div class="tab_header">
                <div :class="index == currentIndex ? 'tab_box_nums' : 'tab_box_num'" v-for="(item,index) in state"
                    :key="item.id" @click="go(index)">
                    <div style="font-size: 14px;font-weight: 600">{{item.name}}</div>
                    <div class="line"></div>
                </div>
            </div>

            <div class="tab_main" v-if="currentIndex == 0">
                <p style="font-size: 14px;font-weight:600;margin-top: 20px;">{{txt}}</p>
                <el-button :type="disabled ? 'info' : 'primary'" :disabled="disabled">{{disabled ? time : '保存'}}
                </el-button>
                <video style="width:100%;height:100%;object-fit: cover;" :src="MV" playsinline autoplay loop muted
                    type="video/mp4"></video>
            </div>
            <div class="tab_main" v-if="currentIndex == 1">
                <img style="width:100%;height:100%" :src="zzfWeb" alt="">
            </div>
            <div class="tab_main" v-if="currentIndex == 2">
                <img style="width:100%;height:100%" :src="zzf" alt="">
            </div>
        </div>
        <CountTo :start='start' :end='end' prefix="￥" suffix="rmb" :autoPlay="true" :duration='3000' />
    </div>
</template>

<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    nextTick,
    reactive,
    onMounted,
    watch,
    computed,
    onUnmounted,
    watchEffect
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { warningmessage , errormessage , successmessage } from '@/api/message.js'
import { music } from '@/api/heromain/hero/transfer.js'
import { Search, CirclePlusFilled, Edit } from "@element-plus/icons";
import zzf from '@/assets/zzf.jpg'
import zzfWeb from '@/assets/zzfWeb.jpg'
import MV from '@/assets/video/沐浴阳光.mp4'
import arrayReduce from "lodash-es/_arrayReduce";
const router = useRouter();
const route = useRoute();
const store = useStore();
const start = ref(0)
const end = ref(2021)
const state = ref([
    {
        id: 1,
        name: "沐浴阳光",
    },
    {
        id: 2,
        name: "程序员",
    },
    {
        id: 3,
        name: "漫头",
    }
])
const currentIndex = ref(0)
const go = (index) => {
    currentIndex.value = index
}
const disabled = ref(true)
const time = ref(null)
const maxtime = ref(300)
const times = () => {
    let minutes = Math.floor(maxtime.value / 60) >= 10 ? Math.floor(maxtime.value / 60) : '0' + Math.floor(maxtime.value / 60)
    let seconds = Math.floor(maxtime.value % 60) >= 10 ? Math.floor(maxtime.value % 60) : '0' + Math.floor(maxtime.value % 60)
    let sum = minutes + ':' + seconds
    time.value = sum
    const timer = setTimeout(() => {
        if (maxtime.value > 0) {
            maxtime.value--
            times()
            disabled.value = true
        } else {
            clearTimeout(timer)
            disabled.value = false
            successmessage('倒计时结束')
        }
    }, 1000)
}
const txt = ref('')
onMounted(() => {
    warningmessage('倒计时开始')
    times()
    let date = new Date()
    let week = date.getDay()
    switch (week) {
        case 0:
            let seven = '今天是周日';
            txt.value = seven;
            break;
        case 1:
            let one = '今天是周一';
            txt.value = one;
            break;
        case 2:
            let two = '今天是周二'
            txt.value = two;
            break;
        case 3:
            let three = '今天是周三'
            txt.value = three;
            break;
        case 4:
            let four = '今天是周四'
            txt.value = four;
            break;
        case 5:
            let five = '今天是周五'
            txt.value = five;
            break;
        case 6:
            let six = '今天是周六'
            txt.value = six;
            break;
    }

    let arr1 = [
        {
            id: "1",
            name: "熊大"
        }
    ]

    let arr2 = [
        {
            id: "1",
            name: "熊大"
        },
        {
            id: "2",
            name: "熊二"
        },
        {
            id: "3",
            name: "光头强"
        },
    ]
    // 方法一通过filter和some过滤两个数组中相同的项
    let newarr = arr2.filter(item => {{
        return !arr1.some(v => v.id === item.id)
    }})
    console.log(newarr);
    // 方法二通过map和includes过滤两个数组中相同的项
    let arrindis = arr1.map(item => {
        return item.id
    })
    console.log(arrindis);
    let result = arr2.filter(item => {
        return !item.id.includes(arrindis)
    })
    console.log(result);

    // 通过indexOf来过滤数组重复的项
    let shuzu = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
    let arrs = []
    shuzu.forEach(item => {
        const i = arrs.indexOf(item)
        if (i == -1) {
            arrs.push(item)
        }
    })
    console.log(arrs);

    let file = 'http://10.101.100.21:7703/file/files/HQ/docx/1659065826379/采购申请使用手册.docx'
    let urs = decodeURI(file)
    console.log(urs);
    let url = encodeURI(urs)
    console.log(url);

    Number.prototype[Symbol.iterator] = function () {
        let i = 0;
        let j = this;
        return {
            next: function () {
                let done = i > j;
                let value = !done ? i++ : undefined;
                return { done, value }
            }
        }
    }

    for (let item of 9) {
        console.log(item);
    }
})
</script>

<style scoped>
.tabss {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tab_box {
    width: 500px;
    height: 300px;
}

.tab_header {
    width: 100%;
    height: 15%;
    display: flex;
    border-bottom: 1px solid #f2f5f9;
}

.tab_box_num {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
}

.tab_box_nums {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
    border-bottom: 1px solid #73a9e5;
}

.tab_main {
    width: 100%;
    height: 80%;
    margin-top: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>